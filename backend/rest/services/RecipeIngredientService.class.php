<?php

require_once 'BaseService.class.php';
require_once __DIR__ . "/../dao/RecipeIngredientDao.class.php";

class RecipeIngredientService extends BaseServices {

    public function __construct()
    {
        parent::__construct(new RecipeIngredientDao);
    }
}
?>