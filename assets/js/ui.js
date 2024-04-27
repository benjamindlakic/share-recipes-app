
function displayRecipes(data) {
    data.forEach(function (recipe) {
      var limitedDescription =
        recipe.Description.slice(0, 150) +
        (recipe.Description.length > 200 ? "..." : "");
      var recipefeedHtml = `
                    <div class="card" data-id="${recipe.RecipeID}">
                        <img src="${recipe.ImageURL}" class="card-img-top" alt="${recipe.Title}">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.Title}</h5>
                            <p class="card-text">${limitedDescription}</p>
                            <div class="social-buttons">
                                <button class="btn btn-like"><i class="bi bi-heart"></i> Like</button>
                                <button class="btn btn-comment"><i class="bi bi-chat"></i> Comment</button>
                                <button class="btn btn-share"><i class="bi bi-share"></i> Share</button>
                            </div>
                        </div>
                    </div>
                    `;
      $("#feedContainer").append(recipefeedHtml);
    });
  }
  // Event delegation for recipe cards
  $("#feedContainer").on("click", ".card", function () {
    var recipeId = $(this).data("id");
    window.location.href = "#recipe-detail";
    getRecipeDetails(recipeId);
});

  function displayCreatedRecipes(data) {
      data.forEach(function (recipe) {
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
      });
    }
  
    function displayLikedRecipes(data) {
      data.forEach(function (recipe) {
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
        $("#likedRecipesContainer").append(recipefeedHtml);
      });
    }
  
    function displayFeaturedRecipes(data) {
      data.sort(() => Math.random() - 0.5);
      data.slice(0, 12).forEach(function (recipe) {
        var limitedDescription =
        recipe.Description.slice(0, 50) +
          (recipe.Description.length > 75 ? "..." : "");
        var featuredRecipesHtml = `
                                    <div class="col-md-6 col-lg-4 col-xl-3 mt-3" >
                                        <div class="rounded position-relative fruite-item" data-id="${recipe.RecipeID}">
                                            <div class="fruite-img">
                                                <img src="${recipe.ImageURL}"
                                                    class="img-fluid w-100 rounded-top" alt="${recipe.Title}" style="height: 200px;">
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
      data.sort(() => Math.random() - 0.5);
      data.slice(0, 6).forEach(function (user) {
        var featuredUsersHtml = `
          <div class="col-lg-6 col-xl-4 mt-3">
            <div class="p-4 rounded bg-light">
              <div class="row align-items-center">
                <div class="col-6">
                  <img src="${
                    user.ProfilePicture
                  }" class="img-fluid rounded-circle w-100" alt="">
                </div>
                <div class="col-6">
                  <a href="#" class="h5">${user.Username}</a>
                  <p class="mb-0">Followers: ${user.Followers}</p>
                  <a class="btn border border-secondary rounded-pill px-3 text-primary follow-btn">${
                    user.Following ? "Following" : "Follow"
                  }</a>
                </div>
              </div>
            </div>
          </div>
        `;
  
        $("#featuredUsersContainer").append(featuredUsersHtml);
      });
  
      // Event delegation to handle button clicks
      $("#featuredUsersContainer").on("click", ".follow-btn", function () {
        var $button = $(this);
        if ($button.text() === "Following") {
          $button.text("Follow");
          $button.css("background-color", "");
        } else {
          $button.text("Following");
          $button.css("background-color", "green");
        }
      });
    }
  
    // Event delegation for featured recipe cards
    $("#featuredRecipeContainer").on("click", ".fruite-item", function () {
      var recipeId = $(this).data("id");
      getRecipeDetails(recipeId);
      window.location.href = "#recipe-detail";
    });