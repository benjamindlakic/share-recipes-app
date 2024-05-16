<?php

    /**
     * @OA\Get(
     *      path="/api/users",
     *      tags={"users"},
     *      summary="Get all users",
     *      security={
     *          {"ApiKey": {}}   
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Users list"
     *      )
     * )
     */

Flight::route('GET /api/users', function () {
    Flight::json(Flight::userService()->get_all());
});

    /**
     * @OA\Get(
     *      path="/api/users/{id}",
     *      tags={"users"},
     *      summary="Get user by id",
     *      @OA\Response(
     *           response=200,
     *           description="User data, or false if user does not exist"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="User ID")
     * )
     */

Flight::route('GET /api/users/@id', function ($id) {
    Flight::json(Flight::userService()->getById($id));
});

    /**
     * @OA\Post(
     *      path="/api/users",
     *      tags={"users"},
     *      summary="Add users data to the database",
     *      @OA\Response(
     *           response=200,
     *           description="User data, or exception if user is not added properly"
     *      ),
     *      @OA\RequestBody(
     *          description="User data payload",
     *          @OA\JsonContent(
     *              required={"Firstname","Lastname","Username","Email", "Password"},
     *              @OA\Property(property="Firstname", type="string", example="User first name", description="User first name"),
     *              @OA\Property(property="Lastname", type="string", example="User last name", description="User first name"),
     *              @OA\Property(property="Username", type="string", example="Username", description="Username"),
     *              @OA\Property(property="Email", type="string", example="Email", description="Email"),
     *              @OA\Property(property="Password", type="string", example="Password", description="Password")
     *          )
     *      )
     * )
     */

Flight::route('POST /api/users', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::userService()->add($data));
});

    /**
     * @OA\Put(
     *      path="/api/users/{id}",
     *      tags={"users"},
     *      summary="Update user by id",
     *      @OA\Response(
     *           response=200,
     *           description="Updated user data or 500 status code exception otherwise"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="User ID"),
     *      @OA\RequestBody(
     *          description="User data payload",
     *          @OA\JsonContent(
     *              required={"Firstname","Lastname","Username","Email", "Password"},
     *              @OA\Property(property="Firstname", type="string", example="User first name", description="User first name"),
     *              @OA\Property(property="Lastname", type="string", example="User last name", description="User first name"),
     *              @OA\Property(property="Username", type="string", example="Username", description="Username"),
     *              @OA\Property(property="Email", type="string", example="Email", description="Email"),
     *              @OA\Property(property="Password", type="string", example="Password", description="Password")
     *          )
     *      )
     * )
     */

Flight::route('PUT /api/users/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::userService()->update($id, $data);
    Flight::json(Flight::userService()->getById($id));
});

    /**
     * @OA\Delete(
     *      path="/api/users/{id}",
     *      tags={"users"},
     *      summary="Delete user by id",
     *      @OA\Response(
     *           response=200,
     *           description="Deleted user data or 500 status code exception otherwise"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="User ID")
     * )
     */

Flight::route('DELETE /api/users/@id', function ($id) {
    Flight::userService()->delete($id);
});
?>