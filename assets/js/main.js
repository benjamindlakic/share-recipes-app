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
  // Function to fetch and display recipe data
  function getRecipes() {
    $.get("recipes.json", function (data) {
      data.forEach(function (recipe) {
        var recipefeedHtml = `
                        <div class="card">
                            <a href=""><img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.title}</h5>
                            </a>
                                <p class="card-text">${recipe.description}</p>
                                <div class="social-buttons">
                                    <button class="btn btn-like"><i class="bi bi-heart"></i> Like</button>
                                    <button class="btn btn-comment"><i class="bi bi-chat"></i> Comment</button>
                                    <button class="btn btn-share"><i class="bi bi-share"></i> Share</button>
                                </div>
                            </div>
                        </div>
                        `;
        $("#feed").append(recipefeedHtml);
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
  // Call the function to fetch and display recipe data
  getRecipes();
  getRecipeDetails();
});
