
function getRecipeDetails(recipeId) {
    var recipe = recipeData.find((recipe) => recipe.id == recipeId);
    if (recipe) {
      var recipeHtml = `
          <div class="row my-5">
              <div class="col-lg-6">
                  <div class="rounded">
                      <img src="${
                        recipe.ImageURL
                      }" class="img-fluid rounded mx-auto d-block" alt="${
        recipe.Title
      }" style="width: 60%; height: auto;">
                  </div>
              </div>
              <div class="col-lg-6 mt-3">
                  <div>
                      <h4 class="fw-bold mb-3">${recipe.Title}</h4>
                      <p class="mb-4">${recipe.Description}</p>
                      <a class="btn btn-primary rounded-pill px-4 mb-2 like-btn" style="background-color:white; color: black;"><i class="fa fa-heart me-2"></i><span class="like-text">Like</span></a>
                  </div>
              </div>
              <hr class="mt-5">
              <div class="row mt-3">
                  <div class="col-lg-6 my-3">
                      <h5 class="fw-bold mb-3">Ingredients:</h5>
                      <p>${recipe.Ingredients}</p>
                  </div>
                  <div class="col-lg-6 mt-3">
                      <h5 class="fw-bold mb-3">Instructions:</h5>
                      <p>${recipe.PreparationSteps}</p>
                  </div>
              </div>
          </div>`;
          
      $("#recipeContainer").html(recipeHtml);
    
      $("#recipeContainer").on("click", ".like-btn", function () {
        var $likeBtn = $(this);
        $likeBtn.toggleClass("liked");
        if ($likeBtn.hasClass("liked")) {
          $likeBtn.find(".like-text").text("Liked");
          $likeBtn.css("background-color", "green");
          $likeBtn.css("color", "white");
        } else {
          $likeBtn.find(".like-text").text("Like");
          $likeBtn.css("background-color", "white");
          $likeBtn.css("color", "black");
        }
      })
    
    }
}