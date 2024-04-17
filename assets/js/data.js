var recipeData;
var usersData;

function getRecipes() {
  $.get("recipes.json", function (data) {
    recipeData = data;
    console.log(recipeData);
    displayRecipes(recipeData);
    displayFeaturedRecipes(recipeData);
    displayCreatedRecipes(recipeData);
    displayLikedRecipes(recipeData);
  });
}

function getUsers() {
  $.get("users.json", function (data) {
    usersData = data;
    displayUsers(usersData);
  });
}

