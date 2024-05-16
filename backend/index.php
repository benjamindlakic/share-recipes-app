<?php

require 'vendor/autoload.php';

// import and register all business logic files (services) to FlightPHP
require_once __DIR__ . '/rest/services/RecipeService.class.php';
require_once __DIR__ . '/rest/services/CommentService.class.php';
require_once __DIR__ . '/rest/services/IngredientService.class.php';
require_once __DIR__ . '/rest/services/LikesDislikesService.class.php';
require_once __DIR__ . '/rest/services/RecipeIngredientService.class.php';
require_once __DIR__ . '/rest/services/UserService.class.php';
require_once __DIR__ . '/rest/services/AuthService.class.php';


Flight::register('recipeService', "RecipeService");
Flight::register('commentService', "CommentService");
Flight::register('ingredientService', "IngredientService");
Flight::register('likesdislikesService', "LikesDislikesService");
Flight::register('recipeingredientService', "RecipeIngredientService");
Flight::register('userService', "UserService");
Flight::register('authService', "AuthService");

// import all routes
require_once __DIR__ . '/rest/routes/RecipeRoutes.php';
require_once __DIR__ . '/rest/routes/CommentRoutes.php';
require_once __DIR__ . '/rest/routes/IngredientRoutes.php';
require_once __DIR__ . '/rest/routes/LikesDislikesRoutes.php';
require_once __DIR__ . '/rest/routes/RecipeIngredientRoutes.php';
require_once __DIR__ . '/rest/routes/UserRoutes.php';
require_once __DIR__ . '/rest/routes/AuthRoutes.php';

// it is still possible to add custom routes after the imports
Flight::route('GET /api/', function () {
    echo "Hello";
});

Flight::start();
?>