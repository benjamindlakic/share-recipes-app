var users = [];
var idCounter = 1;

function addUser(data2) {
  $.ajax({
    url: "http://localhost/share-recipes-app/backend/api/register",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data2),
    success: function (response) {
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User has been successfully registered',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = "#login";
      });
    },
    error: function (error) {
      console.log(error);
      alert("Error occurred while registering user");
    },
  });
}

$("#register-form").validate({
  rules: {
    Firstname: {
      required: true,
      minlength: 2,
    },
    Lastname: {
      required: true,
      minlength: 1,
    },
    Username: {
      required: true,
      minlength: 5,
      maxlength: 12,
    },
    Password: {
      required: true,
      minlength: 5,
    },
    Email: {
      required: true,
      email: true,
    },
    repeat_password: {
      required: true,
      equalTo: "#Password",
    },
  },
  messages: {
    Firstname: {
      required: "You have to fill it in!",
      minlength: "Too short buddy.!",
    },
    Lastname: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
    Username: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
      maxlength: "Too long buddy!",
    },
    Password: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
    Email: {
      required: "You have to fill it in!",
      email: "Invalid email address",
    },
    repeat_password: {
      required: "You have to fill it in!",
      equalTo: "The password and confirm password fields should be the same",
    },
  },
  submitHandler: function (form, event) {
    event.preventDefault();
    blockUi("#register-form");
    serializeForm(form);
    
      var firstname = $('#Firstname').val();
      var lastname = $('#Lastname').val();
      var username = $('#Username').val();
      var email = $('#Email').val();
      var password = $('#Password').val();


      var userData = {
        Firstname: firstname, 
        Lastname: lastname, 
        Username: username, 
        Email: email,
        Password: password,
        ProfilePicture: "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg"
      };

      addUser(userData);
      console.log(userData);
      unblockUi("#register-form");
  },
});

$("#login-form").validate({
  rules: {
    Email: {
      required: true,
      minlength: 5,
    },
    password: {
      required: true,
      minlength: 5,
    },
  },
  messages: {
    Email: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
  },
  submitHandler: function (form, event) {
    event.preventDefault();
    blockUi("#login-form");

    var email = $('#Email').val();
    var password = $('#password').val();

    $.ajax({
      url: "http://localhost/share-recipes-app/backend/auth/login",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ 
        Email: email, 
        Password: password,
      }),
      success: function (response) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.id);
        unblockUi("#login-form");
        window.location.href = "#feed";
      },
      error: function (error) {
        unblockUi("#login-form");
        alert("Invalid credentials");
      }
    });
  },
});

$("#edit-profile-form").validate({
  rules: {
    first_name: {
      required: true,
      minlength: 5,
    },
    bio: {
      required: true,
      maxlength: 500,
    },
  },
  messages: {
    first_name: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
  },
  submitHandler: function (form, event) {
    event.preventDefault();
    blockUi("#edit-profile-form");
    let data = serializeForm(form);
    // Update the user's profile data
    // You can use the user's ID to find and update the corresponding user in the 'users' array
    // Example: users[userId] = data;
    console.log("Updated profile data:", data);
    unblockUi("#edit-profile-form");
    // Redirect to the profile page or any other desired location
    // Example: window.location.href = "#profile";
    alert("Profile has been successfully updated");
  },
});

function addRecipe(data1) {
  $.ajax({
    url: "http://localhost/share-recipes-app/backend/api/recipes",
    type: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    contentType: "application/json",
    data: JSON.stringify(data1),
    success: function (response) {
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Recipe has been successfully uploaded',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = "#feed";
      });
    },
    error: function (error) {
      console.log(error);
      alert("Error occurred while uploading the recipe");
    },
  });
}

$("#upload-recipe-form").validate({
  rules: {
    recipeTitle: {
      required: true,
      minlength: 5,
    },
    recipeDescription: {
      required: true,
      minlength: 10,
    },
    ingredients: {
      required: true,
      minlength: 10,
    },
    instructions: {
      required: true,
      minlength: 10,
    },
    image: {
      required: true,
      accept: "image/*",
    },
    prepTime: {
      required: true,
      minlength: 1,
    },
    difficulty: {
      required: true,
    }
  },
  messages: {
    recipeTitle: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
    recipeDescription: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
    ingredients: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
    instructions: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
    image: {
      required: "You have to select an image!",
      accept: "Only image files are allowed!",
    },
    prepTime: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
    difficulty: {
      required: "Choose it",    
    }
  },
  submitHandler: function (form, event) {
    event.preventDefault();
    blockUi("#upload-recipe-form");
    serializeForm(form);

      var userId = localStorage.getItem('userId');
      var title = $('#Title').val();
      var description = $('#Description').val();
      var instructions = $('#PreparationSteps').val();
      var ingredients = $('#Ingredients').val();
      var preptime = $('#CookingTime').val();
      var difficulty = $('#DifficultyLevel').val();
      var image = $('#ImageURL').val();

      var recipeData = {
        UserID: userId, 
        Title: title, 
        Description: description, 
        PreparationSteps: instructions,
        Ingredients: ingredients,
        CookingTime: preptime, 
        DifficultyLevel: difficulty,
        ImageURL: image
      };

      addRecipe(recipeData);
      unblockUi("#upload-recipe-form");
  },
});


$("#change-password-form").validate({
  rules: {
    current_password: {
      required: true,
      minlength: 5,
    },
    new_password: {
      required: true,
      minlength: 5,
    },
    confirm_password: {
      required: true,
      minlength: 5,
      //equalTo: "#new_password",
    },
  },
  messages: {
    current_password: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
    new_password: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
    confirm_new_password: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
      //equalTo: "The new password and confirm password fields should be the same",
    },
  },
  submitHandler: function (form, event) {
    event.preventDefault();
    blockUi("#change-password-form");
    let data = serializeForm(form);
    // Update the user's password
    // You can use the user's ID to find and update the corresponding user in the 'users' array
    // Example: users[userId].password = data.new_password;
    console.log("Changed password:", data);
    unblockUi("#change-password-form");
    // Redirect to the profile page or any other desired location
    alert("Password has been successfully changed");
  },
});

blockUi = (element) => {
  $(element).block({
    message: '<div class="spinner-border text-primary" role="status"></div>',
    css: {
      backgroundColor: "transparent",
      border: "0",
    },
    overlayCSS: {
      backgroundColor: "#000",
      opacity: 0.25,
    },
  });
};

unblockUi = (element) => {
  $(element).unblock({});
};

serializeForm = (form) => {
  let jsonResult = {};
  $.each($(form).serializeArray(), function () {
    jsonResult[this.name] = this.value;
  });
  return jsonResult;
};

