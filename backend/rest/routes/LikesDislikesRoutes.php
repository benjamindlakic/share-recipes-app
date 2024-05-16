<?php

/**
 * @OA\Get(
 *      path="/api/likesdislikes",
 *      tags={"likesdislikes"},
 *      summary="Get all likes and dislikes",
 *      security={
 *          {"ApiKey": {}}   
 *      },
 *      @OA\Response(
 *           response=200,
 *           description="Likes and dislikes list"
 *      )
 * )
 */

Flight::route('GET /api/likesdislikes', function () {
    
    Flight::json(Flight::likesdislikesService()->get_all());
});

/**
 * @OA\Post(
 *      path="/api/likesdislikes",
 *      tags={"likesdislikes"},
 *      summary="Add likes and dislikes data to the database",
 *      @OA\Response(
 *           response=200,
 *           description="Likes and dislikes data, or exception if likes and dislikes are not added properly"
 *      ),
 *      @OA\RequestBody(
 *          description="Likes and dislikes data payload",
 *          @OA\JsonContent(
 *              required={"RecipeID","UserID","LikeDislike"},
 *              @OA\Property(property="RecipeID", type="string", example="Recipe ID", description="Recipe ID"),
 *              @OA\Property(property="UserID", type="string", example="User ID", description="User ID"),
 *              @OA\Property(property="LikeDislike", type="string", example="Like, Dislike", description="Like status"),
 *          )
 *      )
 * )
 */

Flight::route('POST /api/likesdislikes', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::likesdislikesService()->add($data));
});
?>