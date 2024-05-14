<?php

    /**
     * @OA\Get(
     *      path="/api/comments",
     *      tags={"comments"},
     *      summary="Get all comments",
     *      security={
     *          {"ApiKey": {}}   
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Comments list"
     *      )
     * )
     */

Flight::route('GET /api/comments', function () {
    Flight::json(Flight::commentService()->get_all());
});

    /**
     * @OA\Get(
     *      path="/api/comments/{id}",
     *      tags={"comments"},
     *      summary="Get comment by id",
     *      @OA\Response(
     *           response=200,
     *           description="Comment data, or false if comment does not exist"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Comment ID")
     * )
     */

Flight::route('GET /api/comments/@id', function ($id) {
    Flight::json(Flight::commentService()->getById($id));
});

    /**
     * @OA\Post(
     *      path="/api/comments",
     *      tags={"comments"},
     *      summary="Add comment data to the database",
     *      @OA\Response(
     *           response=200,
     *           description="Comment data, or exception if comment is not added properly"
     *      ),
     *      @OA\RequestBody(
     *          description="Comment data payload",
     *          @OA\JsonContent(
     *              required={"RecipeID","UserID","CommentText"},
     *              @OA\Property(property="RecipeID", type="string", example="Recipe ID", description="Recipe ID"),
     *              @OA\Property(property="UserID", type="string", example="User ID", description="User ID"),
     *              @OA\Property(property="CommentText", type="string", example="Comment text", description="Comment Text"),
     *          )
     *      )
     * )
     */

Flight::route('POST /api/comments', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::commentService()->add($data));
});

    /**
     * @OA\Put(
     *      path="/api/comments/{id}",
     *      tags={"comments"},
     *      summary="Update comment by id",
     *      @OA\Response(
     *           response=200,
     *           description="Updated comment data or 500 status code exception otherwise"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Comment ID"),
     *      @OA\RequestBody(
     *          description="Comment data payload",
     *          @OA\JsonContent(
     *              required={"RecipeID","UserID","CommentText"},
     *              @OA\Property(property="RecipeID", type="string", example="Recipe ID", description="Recipe ID"),
     *              @OA\Property(property="UserID", type="string", example="User ID", description="User ID"),
     *              @OA\Property(property="CommentText", type="string", example="Comment text", description="Comment Text"),
     *          )
     *      )
     * )
     */

Flight::route('PUT /api/comments/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::commentService()->update($id, $data);
    Flight::json(Flight::commentService()->getById($id));
});

    /**
     * @OA\Delete(
     *      path="/api/comments/{id}",
     *      tags={"comments"},
     *      summary="Delete comment by id",
     *      @OA\Response(
     *           response=200,
     *           description="Deleted comment data or 500 status code exception otherwise"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Comment ID")
     * )
     */

Flight::route('DELETE /api/comments/@id', function ($id) {
    Flight::commentService()->delete($id);
});
?>