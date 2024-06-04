<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
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



// Middleware to check JWT on all routes except login and register
Flight::route('/*', function () {
    $path = Flight::request()->url;
    if ($path == '/auth/login' || strpos($path, '/api/register') !== false) {
        return true;
    }

    $headers = getallheaders();

    if (!isset($headers['Authorization'])) {
        Flight::json(["error" => "Unauthorized access"], 403);
        return false;
    } else {
        $token = null;
        if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
            $token = $matches[1];
        }
        try {
            $decoded = (array)JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
            Flight::set('verifiedUser', $decoded);
            return true;
        } catch (Exception $e) {
            Flight::json(["error" => "Token authorization invalid"], 403);
            return false;
        }
    }
});

// import all routes
require_once __DIR__ . '/rest/routes/RecipeRoutes.php';
require_once __DIR__ . '/rest/routes/CommentRoutes.php';
require_once __DIR__ . '/rest/routes/IngredientRoutes.php';
require_once __DIR__ . '/rest/routes/LikesDislikesRoutes.php';
require_once __DIR__ . '/rest/routes/RecipeIngredientRoutes.php';
require_once __DIR__ . '/rest/routes/UserRoutes.php';
require_once __DIR__ . '/rest/routes/AuthRoutes.php';

Flight::start();
?>