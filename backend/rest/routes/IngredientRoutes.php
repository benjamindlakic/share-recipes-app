<?php


Flight::route('GET /api/ingredients', function () {
    
    Flight::json(Flight::ingredientService()->get_all());
});


Flight::route('GET /api/ingredients/@id', function ($id) {
    Flight::json(Flight::ingredientService()->getById($id));
});

Flight::route('POST /api/ingredients', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::ingredientService()->add($data));
});


Flight::route('PUT /api/ingredients/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::ingredientService()->update($id, $data);
    Flight::json(Flight::ingredientService()->getById($id));
});


Flight::route('DELETE /api/ingredients/@id', function ($id) {
    Flight::ingredientService()->delete($id);
});
?>