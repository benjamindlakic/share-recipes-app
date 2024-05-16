<?php

/**
 * @OA\Get(
 *      path="/api/ingredients",
 *      tags={"ingredients"},
 *      summary="Get all ingredients",
 *      @OA\Response(
 *           response=200,
 *           description="Ingredients list"
 *      )
 * )
 */
Flight::route('GET /api/ingredients', function () {
    Flight::json(Flight::ingredientService()->get_all());
});

/**
 * @OA\Get(
 *      path="/api/ingredients/{id}",
 *      tags={"ingredients"},
 *      summary="Get ingredient by id",
 *      @OA\Response(
 *           response=200,
 *           description="Ingredient data, or false if ingredient does not exist"
 *      ),
 *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Ingredient ID")
 * )
 */
Flight::route('GET /api/ingredients/@id', function ($id) {
    Flight::json(Flight::ingredientService()->getById($id));
});

/**
 * @OA\Post(
 *      path="/api/ingredients",
 *      tags={"ingredients"},
 *      summary="Add ingredient data to the database",
 *      @OA\Response(
 *           response=200,
 *           description="Ingredient data, or exception if ingredient is not added properly"
 *      ),
 *      @OA\RequestBody(
 *          description="Ingredient data payload",
 *          @OA\JsonContent(
 *              required={"Name", "Description", "MeasurementUnit"},
 *              @OA\Property(property="Name", type="string", example="Ingredient name", description="Ingredient name"),
 *              @OA\Property(property="Description", type="string", example="Ingredient description", description="Ingredient description"),
 *              @OA\Property(property="MeasurementUnit", type="string", example="Measurement unit", description="Measurement unit")
 *          )
 *      )
 * )
 */
Flight::route('POST /api/ingredients', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::ingredientService()->add($data));
});

/**
 * @OA\Put(
 *      path="/api/ingredients/{id}",
 *      tags={"ingredients"},
 *      summary="Update ingredient by id",
 *      @OA\Response(
 *           response=200,
 *           description="Updated ingredient data or 500 status code exception otherwise"
 *      ),
 *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Ingredient ID"),
 *      @OA\RequestBody(
 *          description="Ingredient data payload",
 *          @OA\JsonContent(
 *              required={"Name", "Description", "MeasurementUnit"},
 *              @OA\Property(property="Name", type="string", example="Ingredient name", description="Ingredient name"),
 *              @OA\Property(property="Description", type="string", example="Ingredient description", description="Ingredient description"),
 *              @OA\Property(property="MeasurementUnit", type="string", example="Measurement unit", description="Measurement unit")
 *          )
 *      )
 * )
 */
Flight::route('PUT /api/ingredients/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::ingredientService()->update($id, $data);
    Flight::json(Flight::ingredientService()->getById($id));
});

/**
 * @OA\Delete(
 *      path="/api/ingredients/{id}",
 *      tags={"ingredients"},
 *      summary="Delete ingredient by id",
 *      @OA\Response(
 *           response=200,
 *           description="Deleted ingredient data or 500 status code exception otherwise"
 *      ),
 *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Ingredient ID")
 * )
 */
Flight::route('DELETE /api/ingredients/@id', function ($id) {
    Flight::ingredientService()->delete($id);
});
?>