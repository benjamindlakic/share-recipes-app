<?php

require_once __DIR__ . '/BaseDao.class.php';

class RecipeDao extends BaseDao  {
   
    public function __construct() {
        parent::__construct("Recipes");
    }
    
}

?>
