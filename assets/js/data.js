
var recipeData;
var usersData;

function getRecipes() {
  $.get("http://localhost/share-recipes-app/backend/api/recipes", function (data) {
    recipeData = data;
    console.log(recipeData);
    displayRecipes(recipeData);
    displayFeaturedRecipes(recipeData);
    displayCreatedRecipes(recipeData);
    displayLikedRecipes(recipeData);
  });
}

function getUsers() {
  $.get("http://localhost/share-recipes-app/backend/api/users", function (data) {
    usersData = data;
    displayUsers(usersData);
  });
}

