<?php

require_once __DIR__ . '/../dao/RecipeDao.class.php';

class RecipeService{
    private $recipe_dao;

    public function __construct(){
        $this->recipe_dao = new RecipeDao();
    }


    public function add_recipe($recipe){
        return $this->recipe_dao->add_recipe($recipe);
    }
}