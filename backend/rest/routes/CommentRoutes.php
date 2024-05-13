<?php


Flight::route('GET /api/comments', function () {
    Flight::json(Flight::commentService()->get_all());
});


Flight::route('GET /api/comments/@id', function ($id) {
    Flight::json(Flight::commentService()->getById($id));
});

Flight::route('POST /api/comments', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::commentService()->add($data));
});


Flight::route('PUT /api/comments/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::commentService()->update($id, $data);
    Flight::json(Flight::commentService()->getById($id));
});


Flight::route('DELETE /api/comments/@id', function ($id) {
    Flight::commentService()->delete($id);
});
?>