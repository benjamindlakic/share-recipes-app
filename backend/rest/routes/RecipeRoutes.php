<?php


Flight::route('GET /api/recipes', function () {
    
    Flight::json(Flight::recipeService()->get_all());
});


Flight::route('GET /api/recipes/@id', function ($id) {
    Flight::json(Flight::recipeService()->getById($id));
});

Flight::route('POST /api/recipes', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::recipeService()->add($data));
});


Flight::route('PUT /api/recipes/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::recipeService()->update($id, $data);
    Flight::json(Flight::recipeService()->getById($id));
});


Flight::route('DELETE /api/recipes/@id', function ($id) {
    Flight::recipeService()->delete($id);
});
?>