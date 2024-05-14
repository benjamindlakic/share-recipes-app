<?php

/**
 * @OA\Get(
 *      path="/api/recipeingredients",
 *      tags={"recipeingredients"},
 *      summary="Get all recipe ingredients",
 *      @OA\Response(
 *           response=200,
 *           description="Recipe ingredients list"
 *      )
 * )
 */
Flight::route('GET /api/recipeingredients', function () {
    Flight::json(Flight::recipeingredientService()->get_all());
});

/**
 * @OA\Post(
 *      path="/api/recipeingredients",
 *      tags={"recipeingredients"},
 *      summary="Add recipe ingredient to the database",
 *      @OA\Response(
 *           response=200,
 *           description="Recipe ingredient data, or exception if not added properly"
 *      ),
 *      @OA\RequestBody(
 *          description="Recipe ingredient data payload",
 *          @OA\JsonContent(
 *              required={"RecipeID", "IngredientID", "Quantity"},
 *              @OA\Property(property="RecipeID", type="string", example="Recipe ID", description="Recipe ID"),
 *              @OA\Property(property="IngredientID", type="string", example="Ingredient ID", description="Ingredient ID"),
 *              @OA\Property(property="quantity", type="string", example="Ingredient quantity", description="Quantity of the ingredient")
 *          )
 *      )
 * )
 */

Flight::route('POST /api/recipeingredients', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::recipeingredientService()->add($data));
});
?>