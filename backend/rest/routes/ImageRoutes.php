<?php


Flight::route('GET /api/images', function () {
    Flight::json(Flight::imageService()->get_all());
});

Flight::route('GET /api/images/@id', function ($id) {
    Flight::json(Flight::imageService()->getById($id));
});

Flight::route('POST /api/images', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::imageService()->add($data));
});

Flight::route('PUT /api/images/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::imageService()->update($id, $data);
    Flight::json(Flight::imageService()->getById($id));
});

Flight::route('DELETE /api/images/@id', function ($id) {
    Flight::imageService()->delete($id);
});
?>