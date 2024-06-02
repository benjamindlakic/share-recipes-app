var token = localStorage.getItem("token");
if (token) {
  var recipeData;
  var usersData;

  function getRecipes() {
    $.ajax({
      url: "http://localhost/share-recipes-app/backend/api/recipes",
      type: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      success: function (data) {
        recipeData = data;
        localStorage.setItem("recipeData", JSON.stringify(recipeData));
        displayRecipes(recipeData);
        displayFeaturedRecipes(recipeData);
        displayCreatedRecipes(recipeData);
      },
    });
  }
  function getUsers() {
    $.ajax({
      url: "http://localhost/share-recipes-app/backend/api/users",
      type: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      success: function (data) {
        usersData = data;
        displayUsers(usersData);
      },
    });
  }
} else {
  window.location.href = "#login";
}
