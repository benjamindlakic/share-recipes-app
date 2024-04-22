<?php


Flight::route('GET /api/recipeingredients', function () {
    
    Flight::json(Flight::recipeingredientService()->get_all());
});


Flight::route('GET /api/recipeingredients/@id', function ($id) {
    Flight::json(Flight::recipeingredientService()->getById($id));
});

Flight::route('POST /api/recipeingredients', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::recipeingredientService()->add($data));
});


Flight::route('PUT /api/recipeingredients/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::recipeingredientService()->update($id, $data);
    Flight::json(Flight::recipeingredientService()->getById($id));
});


Flight::route('DELETE /api/recipeingredients/@id', function ($id) {
    Flight::recipeingredientService()->delete($id);
});
?>