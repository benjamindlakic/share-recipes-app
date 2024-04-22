<?php

require_once __DIR__ . '/rest/services/RecipeService.class.php';

$recipe_service = new RecipeService();
$recipe_service->add_recipe([]);