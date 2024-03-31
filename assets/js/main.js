(function ($) {
  "use strict";

  // Fixed Navbar
  $(window).scroll(function () {
    if ($(window).width() < 992) {
      if ($(this).scrollTop() > 55) {
        $(".fixed-top").addClass("shadow");
      } else {
        $(".fixed-top").removeClass("shadow");
      }
    } else {
      if ($(this).scrollTop() > 55) {
        $(".fixed-top").addClass("shadow").css("top", -55);
      } else {
        $(".fixed-top").removeClass("shadow").css("top", 0);
      }
    }
  });

  // Product Quantity
  $(".quantity button").on("click", function () {
    var button = $(this);
    var oldValue = button.parent().parent().find("input").val();
    if (button.hasClass("btn-plus")) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    button.parent().parent().find("input").val(newVal);
  });
})(jQuery);

$(document).ready(function () {
  $(document).on("click", ".btn-like", function () {
    $(this).toggleClass("liked");
    var icon = $(this).find("i");
    icon.toggleClass("bi-heart bi-heart-fill");
  });

  // Function to fetch and display recipe data
  function getRecipes() {
    $.get("recipes.json", function (data) {
      data.forEach(function (recipe) {
        var limitedDescription =
          recipe.description.slice(0, 150) +
          (recipe.description.length > 200 ? "..." : "");
        var recipefeedHtml = `
                        <div class="card">
                            <a href=""><img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title}</h5>
                            </a>
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
    });
  }
  // Function to fetch and display recipe data
  function getRecipeDetails() {
    $.get("recipes.json", function (data) {
      data.forEach(function (recipe) {
        var recipeHtml = `
                    <div class="row my-5">
                        <div class="col-lg-6">
                            <div class="rounded">
                                <img src="${
                                  recipe.image
                                }" class="img-fluid rounded mx-auto d-block" alt="${
          recipe.title
        }" style="width: 60%; height: auto;">
                            </div>
                        </div>
                        <div class="col-lg-6 mt-3">
                            <div>
                                <h4 class="fw-bold mb-3">${recipe.title}</h4>
                                <p class="mb-4">${recipe.description}</p>
                                <a href="#" class="btn btn-primary rounded-pill px-4 mb-2"><i class="fa fa-heart me-2"></i>Like</a>
                            </div>
                    </div>
                    <hr class="mt-5">
                    <div class="row mt-3">
                            <div class="col-lg-6 my-3">
                                <h5 class="fw-bold mb-3">Ingredients:</h5>
                                <ul class="list-group">
                                    ${recipe.ingredients
                                      .map(
                                        (ingredient) =>
                                          `<li class="list-group-item">${ingredient}</li>`
                                      )
                                      .join("")}
                                </ul>
                            </div>
                            <div class="col-lg-6 mt-3">
                                <h5 class="fw-bold mb-3">Instructions:</h5>
                                <ol class="list-group">
                                    ${recipe.instructions
                                      .map(
                                        (instruction) =>
                                          `<li class="list-group-item">${instruction}</li>`
                                      )
                                      .join("")}
                                </ol>
                            </div>
                        </div>
                    `;
        $("#recipeContainer").append(recipeHtml);
      });
    });
  }

  function getFeaturedRecipes() {
    $.get("recipes.json", function (data) {
      data.sort(() => Math.random() - 0.5);
      data.slice(0, 12).forEach(function (recipe) {
        var limitedDescription =
          recipe.description.slice(0, 50) +
          (recipe.description.length > 75 ? "..." : "");
        var featuredRecipesHtml = `
                                    <div class="col-md-6 col-lg-4 col-xl-3 mt-3" >
                                        <div class="rounded position-relative fruite-item">
                                            <div class="fruite-img">
                                                <img src="${recipe.image}"
                                                    class="img-fluid w-100 rounded-top" alt="${recipe.title}" style="height: 200px;">
                                            </div>
                                      
                                            <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                                                <h4>${recipe.title}</h4>
                                                <p>${limitedDescription}</p>
                                            </div>
                                        </div>
                                    </div>

                `;
        $("#featuredRecipeContainer").append(featuredRecipesHtml);
      });
    });
  }

  function getFeaturedUsers() {
    $.get("users.json", function (data) {
        data.sort(() => Math.random() - 0.5);
        data.slice(0, 6).forEach(function (user) {
            var featuredUsersHtml = `
                                     <div class="col-lg-6 col-xl-4">
                                        <div class="p-4 rounded bg-light">
                                            <div class="row align-items-center">
                                                <div class="col-6">
                                                    <img src="${user.avatar}" class="img-fluid rounded-circle w-100" alt="">
                                                </div>
                                                <div class="col-6">
                                                    <a href="#" class="h5">${user.username}</a>
                                                    <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary"><i
                                                            class="fa fa-star me-2 text-primary"></i>Follow</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                `;
        $("#featuredUsersContainer").append(featuredUsersHtml);
      });
    });
  }

  // Call the function to fetch and display recipe data
  getRecipes();
  getRecipeDetails();
  getFeaturedRecipes();
  getFeaturedUsers();
});
