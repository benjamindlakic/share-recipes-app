<?php

    /**
     * @OA\Get(
     *      path="/api/recipes",
     *      tags={"recipes"},
     *      summary="Get all recipes",
     *      security={
     *          {"ApiKey": {}}   
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Recipes list"
     *      )
     * )
     */

Flight::route('GET /api/recipes', function () {
    Flight::json(Flight::recipeService()->get_all());
});

    /**
     * @OA\Get(
     *      path="/api/recipes/{id}",
     *      tags={"recipes"},
     *      summary="Get recipe by id",
     *      @OA\Response(
     *           response=200,
     *           description="Recipe data, or false if recipe does not exist"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Recipe ID")
     * )
     */

Flight::route('GET /api/recipes/@id', function ($id) {
    Flight::json(Flight::recipeService()->getById($id));
});

    /**
     * @OA\Post(
     *      path="/api/recipes",
     *      tags={"recipes"},
     *      summary="Add recipe data to the database",
     *      @OA\Response(
     *           response=200,
     *           description="Recipe data, or exception if recipe is not added properly"
     *      ),
     *      @OA\RequestBody(
     *          description="Recipe data payload",
     *          @OA\JsonContent(
     *              required={"Title","Description","Ingredients","PreparationSteps", "CookingTime", "DifficultyLevel","ImageURL"},
     *              @OA\Property(property="Title", type="string", example="Recipe title", description="Recipe title"),
     *              @OA\Property(property="Description", type="string", example="Recipe description", description="Recipe description"),
     *              @OA\Property(property="Ingredients", type="string", example="Recipe ingredients", description="Recipe ingredients"),
     *              @OA\Property(property="PreparationSteps", type="string", example="Recipe instructions", description="Recipe instructions"),
     *              @OA\Property(property="CookingTime", type="number", example="Recipe cooking time", description="Recipe cooking time"),
     *              @OA\Property(property="DifficultyLevel", type="string", example="Recipe difficulty level", description="Easy, Medium, Hard"),
     *              @OA\Property(property="ImageURL", type="string", example="URL", description="Recipe image URL")
     *          )
     *      )
     * )
     */
    
Flight::route('POST /api/recipes', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::recipeService()->add($data));
});

    /**
     * @OA\Put(
     *      path="/api/recipes/{id}",
     *      tags={"recipes"},
     *      summary="Update recipe by id",
     *      @OA\Response(
     *           response=200,
     *           description="Updated recipe data or 500 status code exception otherwise"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Recipe ID"),
     *      @OA\RequestBody(
     *          description="Recipe data payload",
     *          @OA\JsonContent(
     *              required={"Title","Description","Ingredients","PreparationSteps", "CookingTime", "DifficultyLevel","ImageURL"},
     *              @OA\Property(property="Title", type="string", example="Recipe title", description="Recipe title"),
     *              @OA\Property(property="Description", type="string", example="Recipe description", description="Recipe description"),
     *              @OA\Property(property="Ingredients", type="string", example="Recipe ingredients", description="Recipe ingredients"),
     *              @OA\Property(property="PreparationSteps", type="string", example="Recipe instructions", description="Recipe instructions"),
     *              @OA\Property(property="CookingTime", type="number", example="Recipe cooking time", description="Recipe cooking time"),
     *              @OA\Property(property="DifficultyLevel", type="string", example="Recipe difficulty level", description="Easy, Medium, Hard"),
     *              @OA\Property(property="ImageURL", type="string", example="https://example.com/image.jpg", description="Recipe image URL")
     *          )
     *      )
     * )
     */

Flight::route('PUT /api/recipes/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::recipeService()->update($id, $data);
    Flight::json(Flight::recipeService()->getById($id));
});

    /**
     * @OA\Delete(
     *      path="/api/recipes/{id}",
     *      tags={"recipes"},
     *      summary="Delete recipe by id",
     *      @OA\Response(
     *           response=200,
     *           description="Deleted recipe data or 500 status code exception otherwise"
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Recipe ID")
     * )
     */

Flight::route('DELETE /api/recipes/@id', function ($id) {
    Flight::recipeService()->delete($id);
});
?>