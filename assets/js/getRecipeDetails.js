function getRecipeDetails(recipeId) {
  $("#recipeContainer").ready(function () {
    var data11 = localStorage.getItem("recipeData");
    var recipe = JSON.parse(data11).find((recipe) => recipe.id == recipeId);
    if (recipe) {
      // Fetch creator's information from the backend API
      $.get(`http://localhost/share-recipes-app/backend/api/users`, function (userData) {
        var user = userData.find(function (user) {
          return user.id === recipe.UserID;
        });
        if (userData) {
          var recipeHtml = `
              <div class="row my-5">
                  <div class="col-lg-6">
                      <div class="rounded">
                          <img src="${recipe.ImageURL}" class="img-fluid rounded mx-auto d-block" alt="${recipe.Title}" style="width: 60%; height: auto;">
                      </div>
                  </div>
                  <div class="col-lg-6 mt-3">
                      <div>
                          <h4 class="fw-bold mb-3">${recipe.Title}</h4>
                          <p class="mb-4">${recipe.Description}</p>
                          <p class="mb-2">Created by: ${user.Firstname} ${user.Lastname}</p>
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
        }
      });
    }
  });
}