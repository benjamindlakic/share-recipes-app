<?php

require_once 'BaseService.class.php';
require_once __DIR__ . "/../dao/RecipeDao.class.php";

class RecipeService extends BaseServices {

    public function __construct()
    {
        parent::__construct(new RecipeDao);
    }
}
?>