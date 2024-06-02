var token = localStorage.getItem("token");
if (token) {
  function displayRecipes(data) {
    $("#feedContainer").empty();

    data.forEach(function (recipe) {
      var limitedDescription =
        recipe.Description.slice(0, 150) +
        (recipe.Description.length > 200 ? "..." : "");
      var recipefeedHtml = `
                    <div class="card" data-id="${recipe.id}">
                        <img src="${recipe.ImageURL}" class="card-img-top" alt="${recipe.Title}">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.Title}</h5>
                            <p class="card-text">${limitedDescription}</p>
                        </div>
                    </div>
                    `;
      $("#feedContainer").append(recipefeedHtml);
    });
  }
  // Event delegation for recipe cards
  $("#feedContainer").on("click", ".card", function () {
    var recipeId = $(this).data("id");
    window.location.href = `#recipe-detail`;
    getRecipeDetails(recipeId);
  });

  function displayCreatedRecipes(data) {
    var userId = localStorage.getItem("userId");

    $("#createdRecipesContainer").empty();

    data.forEach(function (recipe) {
      if (recipe.UserID == userId) {
        var limitedDescription =
          recipe.Description.slice(0, 75) +
          (recipe.Description.length > 100 ? "..." : "");
        var recipefeedHtml = `
                    <div class="col-md-6 col-lg-4 col-xl-3 mt-3" >
                      <div class="card" style="width: 80%; ">
                          <img src="${recipe.ImageURL}" class="card-img-top" style="height: 200px" alt="${recipe.Title}">
                          <div class="card-body">
                              <h5 class="card-title">${recipe.Title}</h5>
                              <p class="card-text">${limitedDescription}</p>
                          </div>
                      </div>
                    </div>
                      `;
        $("#createdRecipesContainer").append(recipefeedHtml);
      }
    });
  }

  function displayFeaturedRecipes(data) {
    $("#featuredRecipeContainer").empty();

    data.sort(() => Math.random() - 0.5);
    data.slice(0, 12).forEach(function (recipe) {
      var limitedDescription =
        recipe.Description.slice(0, 50) +
        (recipe.Description.length > 75 ? "..." : "");
      var featuredRecipesHtml = `
                                    <div class="col-md-6 col-lg-4 col-xl-3 mt-3" >
                                        <div class="rounded position-relative fruite-item" data-id="${recipe.id}">
                                            <div class="fruite-img">
                                                <img src="${recipe.ImageURL}"
                                                    class="img-fluid w-100 rounded-top" alt="${recipe.Title}" style="height: 150px;">
                                            </div>
                                      
                                            <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                                <h4>${recipe.Title}</h4>
                                                <p>${limitedDescription}</p>
                                            </div>
                                        </div>
                                    </div>
  
                `;
      $("#featuredRecipeContainer").append(featuredRecipesHtml);
    });
  }

  // Function to display recipe cards
  function displayUsers(data) {
    $("#featuredUsersContainer").empty();

    data.sort(() => Math.random() - 0.5);
    data.slice(0, 6).forEach(function (user) {
      var featuredUsersHtml = `
          <div class="col-lg-4 col-xl-4 mt-3">
            <div class="p-4 rounded bg-light">
              <div class="row align-items-center">
                <div class="col-6">
                  <img src="${user.ProfilePicture}" class="img-fluid rounded-circle w-50">
                </div>
                <div class="col-6">
                  <a href="#" class="h5">${user.Username}</a>
                  <p class="mb-0">Followers: ${user.Followers}</p>
                </div>
              </div>
            </div>
          </div>
        `;

      $("#featuredUsersContainer").append(featuredUsersHtml);
    });
  }

  // Event delegation for featured recipe cards
  $("#featuredRecipeContainer").on("click", ".fruite-item", function () {
    var recipeId = $(this).data("id");
    getRecipeDetails(recipeId);
    window.location.href = "#recipe-detail";
  });
} else {
  window.location.href = "#login";
}
