<?php


Flight::route('GET /api/likesdislikes', function () {
    
    Flight::json(Flight::likesdislikesService()->get_all());
});


Flight::route('GET /api/likesdislikes/@id', function ($id) {
    Flight::json(Flight::likesdislikesService()->getById($id));
});

Flight::route('POST /api/likesdislikes', function () {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::likesdislikesService()->add($data));
});


Flight::route('PUT /api/likesdislikes/@id', function ($id) {
    $data = Flight::request()->data->getData();
    Flight::likesdislikesService()->update($id, $data);
    Flight::json(Flight::likesdislikesService()->getById($id));
});


Flight::route('DELETE /api/likesdislikes/@id', function ($id) {
    Flight::likesdislikesService()->delete($id);
});
?>