<?php

require_once __DIR__ . '/BaseDao.class.php';

class IngredientDao extends BaseDao  {
   
    public function __construct() {
        parent::__construct("Ingredients");
    }

}

?>
