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
  // Variable to store recipe data
  var recipeData;
  var usersData;

  // Function to fetch and store recipe data
  function getRecipes() {
    $.get("recipes.json", function (data) {
      recipeData = data;
      displayRecipes(recipeData);
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

  // Function to display recipe cards
  function displayRecipes(data) {
    data.forEach(function (recipe) {
      var limitedDescription =
        recipe.description.slice(0, 150) +
        (recipe.description.length > 200 ? "..." : "");
      var recipefeedHtml = `
                    <div class="card" data-id="${recipe.id}">
                        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.title}</h5>
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

  function displayCreatedRecipes(data) {
    data.forEach(function (recipe) {
      var limitedDescription =
        recipe.description.slice(0, 75) +
        (recipe.description.length > 100 ? "..." : "");
      var recipefeedHtml = `
                  <div class="col-md-6 col-lg-4 col-xl-3 mt-3" >
                    <div class="card" style="width: 80%; ">
                        <img src="${recipe.image}" class="card-img-top" style="height: 200px" alt="${recipe.title}">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.title}</h5>
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
        recipe.description.slice(0, 75) +
        (recipe.description.length > 100 ? "..." : "");
      var recipefeedHtml = `
                <div class="col-md-6 col-lg-4 col-xl-3 mt-3" >
                  <div class="card" style="width: 80%; ">
                      <img src="${recipe.image}" class="card-img-top" style="height: 200px" alt="${recipe.title}">
                      <div class="card-body">
                          <h5 class="card-title">${recipe.title}</h5>
                          <p class="card-text">${limitedDescription}</p>
                      </div>
                  </div>
                </div>
                    `;
      $("#likedRecipesContainer").append(recipefeedHtml);
    });
  }

  // Event delegation for recipe cards
  $("#feedContainer").on("click", ".card", function () {
    var recipeId = $(this).data("id");
    window.location.href = "#recipe-detail";
    getRecipeDetails(recipeId);
  });

  // Function to display recipe details
  function getRecipeDetails(recipeId) {
    var recipe = recipeData.find((recipe) => recipe.id == recipeId);
    if (recipe) {
      $("#recipeContainer").empty();
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
                      <a class="btn btn-primary rounded-pill px-4 mb-2 like-btn" style="background-color:white; color: black;"><i class="fa fa-heart me-2"></i><span class="like-text">Like</span></a>
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
          </div>`;

      $("#recipeContainer").append(recipeHtml);

      // Event delegation to handle Like button click
      $("#recipeContainer").on("click", ".like-btn", function () {
        var $likeBtn = $(this);
        $likeBtn.toggleClass("liked");
        if ($likeBtn.hasClass("liked")) {
          $likeBtn.find(".like-text").text("Unlike");
          $likeBtn.css("background-color", "green");
          $likeBtn.css("color", "white");
        } else {
          $likeBtn.find(".like-text").text("Like");
          $likeBtn.css("background-color", "white");
          $likeBtn.css("color", "black");
        }
      });
    }
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
                                        <div class="rounded position-relative fruite-item" data-id="${recipe.id}">
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
                  user.avatar
                }" class="img-fluid rounded-circle w-100" alt="">
              </div>
              <div class="col-6">
                <a href="#" class="h5">${user.username}</a>
                <p class="mb-0">Followers: ${user.followers}</p>
                <a class="btn border border-secondary rounded-pill px-3 text-primary follow-btn">${
                  user.following ? "Following" : "Follow"
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
    window.location.href = "#recipe-detail";
    getRecipeDetails(recipeId);
  });

  // function getFeaturedUsers() {
  //   $.get("users.json", function (data) {

  //   });
  // }
  // Function to get user details
  function getUserDetails(userId) {
    $.get("users.json", function (data) {
      var user = data.find(function (user) {
        return user.id === userId;
      });
      if (user) {
        var userDetailsHtml = `
              <img src="${user.avatar}" alt="Profile Picture" class="img-fluid rounded-circle" style="width: 150px; height: 150px;">
              <h2 class="mt-3">${user.name}</h2>
              <p>Followers: ${user.followers}</p>
        `;
        $("#userDetailsContainer").html(userDetailsHtml);
      }
    });
  }

  getRecipes();
  getUsers();
  getFeaturedRecipes();
  getUserDetails(2);
});
