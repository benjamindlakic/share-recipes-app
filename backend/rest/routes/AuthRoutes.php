<?php

    /**
     * @OA\Post(
     *      path="/auth/login",
     *      tags={"auth"},
     *      summary="Login to system using email and password",
     *      @OA\Response(
     *           response=200,
     *           description="Patient data and JWT"
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

     Flight::route('POST /login', function () {
        $payload = Flight::request()->data->getData();
        $user = Flight::authService()->get_user_by_email($payload['Email']);
    });