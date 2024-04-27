$(document).ready(function () {

  function addRecipe(data1) {
    $.ajax({
      url: "http://localhost/share-recipes-app/backend/api/recipes",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data1),
      success: function (response) {
        console.log(response);
        alert("Recipe has been successfully uploaded");
      },
      error: function (error) {
        console.log(error);
        alert("Error occurred while uploading the recipe");
      }
    });
  }

$('#added-recipe').click(function() {

  var user = $('#UserID').val();
  var title = $('#Title').val();
  var description = $('#Description').val();
  var instructions = $('#PreparationSteps').val();
  var preptime = $('#CookingTime').val();
  var image = $('#ImageURL').val();

  var recipeData1 = {
    UserID: user, 
    Title: title, 
    Description: description, 
    PreparationSteps: instructions, 
    CookingTime: preptime, 
    ImageURL: image
  };

  addRecipe(recipeData1);

});
});