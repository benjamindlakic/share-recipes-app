<?php
    use \Firebase\JWT\JWT;

    /**
     * @OA\Post(
     *      path="/auth/login",
     *      tags={"auth"},
     *      summary="Login to system using email and password",
     *      @OA\Response(
     *           response=200,
     *           description="User data and JWT"
     *      ),
     *      @OA\RequestBody(
     *          description="Credentials",
     *          @OA\JsonContent(
     *              required={"Email","Password"},
     *              @OA\Property(property="Email", type="string", example="email@example.com", description="User email"),
     *              @OA\Property(property="Password", type="string", example="password", description="User password"),
     *          )
     *      )
     * )
     */

     Flight::route('POST /auth/login', function () {
        $payload = Flight::request()->data->getData();
        $user = Flight::authService()->get_user_by_email($payload['Email']);
        
        if (!$user || !password_verify($payload['Password'], $user['Password'])) {
            Flight::json(['error' => true, 'message' => 'Invalid username or password']);
            return;
        }

        $jwt = generate_jwt($user);

        Flight::json(['error' => false, 'data' => $user + ['token' => $jwt]]);
    });

    function generate_jwt($user) {
        $secret_key = JWT_SECRET;
        $issuer = "http://localhost";
        $audience = "http://localhost";
        $issued_at = time();
        $expiration_time = $issued_at + (60 * 60); // jwt valid for 1 hour from the issued time
    
        $payload = array(
            "iss" => $issuer,
            "aud" => $audience,
            "iat" => $issued_at,
            "exp" => $expiration_time,
            "data" => array(
                "id" => $user['id'],
                "email" => $user['Email']
            )
        );
    
        $jwt = JWT::encode($payload, $secret_key, 'HS256');
        return $jwt;
    }
    