<?php

require_once 'BaseService.class.php';
require_once __DIR__ . "/../dao/IngredientDao.class.php";

class IngredientService extends BaseServices {

    public function __construct()
    {
        parent::__construct(new IngredientDao);
    }
}
?>