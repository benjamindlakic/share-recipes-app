<?php 

require_once __DIR__ . '/BaseDao.class.php';

class RecipeDao extends BaseDao {
    public function __construct(){
        parent::__construct("recipes");
    }

    public function add_recipe($recipe){
        // $sql = "INSERT INTO recipes (title, description, ingredients, directions, user_id) VALUES (:title, :description, :ingredients, :directions, :user_id)";
        // $stmt= $this->connection->prepare($sql);
        // $stmt->execute($recipe);
        // $recipe['id'] = $this->connection->lastInsertId();
        return $recipe;
    }
}

