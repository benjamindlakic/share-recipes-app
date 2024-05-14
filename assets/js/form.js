var users = [];
var idCounter = 1;

function addUser(data2) {
  $.ajax({
    url: "http://localhost/share-recipes-app/backend/api/users",
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
    firstname: {
      required: true,
      minlength: 2,
    },
    lastname: {
      required: true,
      minlength: 1,
    },
    username: {
      required: true,
      minlength: 5,
      maxlength: 12,
    },
    password: {
      required: true,
      minlength: 5,
    },
    email: {
      required: true,
      email: true,
    },
    repeat_password: {
      equalTo: "#Password",
    },
  },
  messages: {
    firstname: {
      required: "You have to fill it in!",
      minlength: "Too short buddy.!",
    },
    lastname: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
    username: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
      maxlength: "Too long buddy!",
    },
    password: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
    email: {
      required: "You have to fill it in!",
      email: "Invalid email address",
    },
    repeat_password: {
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
      var pic = $('#ProfilePicture').val();

      var userData = {
        Firstname: firstname, 
        Lastname: lastname, 
        Username: username, 
        Email: email,
        Password: password,
        ProfilePicture: pic
      };

      addUser(userData);
      console.log(userData);
      unblockUi("#register-form");
  },
});

$("#login-form").validate({
  rules: {
    username: {
      required: true,
      minlength: 5,
    },
    password: {
      required: true,
      minlength: 5,
    },
  },
  messages: {
    username: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
  },
  submitHandler: function (form, event) {
    event.preventDefault();
    blockUi("#login-form");
    let data = serializeForm(form);
    console.log("Login data:", data);
    unblockUi("#login-form");
    window.location.href = "#home";
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
    
      var user = $('#UserID').val();
      var title = $('#Title').val();
      var description = $('#Description').val();
      var instructions = $('#PreparationSteps').val();
      var ingredients = $('#Ingredients').val();
      var preptime = $('#CookingTime').val();
      var difficulty = $('#DifficultyLevel').val();
      var image = $('#ImageURL').val();

      var recipeData = {
        UserID: user, 
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
// function objectFormHandler(form, event) {
//   // TODO check whether the form action is create a new user or update a existing user

//   event.preventDefault();
//   blockUi("#register-form");
//   let data = serializeForm(form);

//   data["id"] = idCounter;
//   data[
//     "action"
//   ] = `<button onClick="editUserDetails(${idCounter})">Edit</button>`;
//   idCounter += 1;
//   users.push(data);

//   if ($.fn.dataTable.isDataTable("#tutorials-table")) {
//     $("#tutorials-table").DataTable().destroy();
//   }
//   initializeDatatable("#tutorials-table", users);

//   $("#tutorial-form")[0].reset();

//   unblockUi("#tutorial-form");
// }

// function apiFormHandler(form, event) {
//   event.preventDefault();
//   blockUi("#tutorial-form");
//   let data = serializeForm(form);

//   $.post(
//     "http://localhost:8018/mobile-api/v1/api/sample",
//     JSON.stringify(data)
//   ).done(function (data) {
//     $("#tutorial-form")[0].reset();
//     $("#toast-description").text(data.message);
//     $("#success-toast").toast("show");
//   }).fail(function (xhr) {
//     $("#toast-description").text(xhr.responseJSON.message);
//     $("#success-toast").toast("show");
//   }).always(function() {
//     unblockUi("#tutorial-form");
//   });
// }

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

// editUserDetails = (userId) => {
//   var selectedUser = {};
//   $.each(users, (idx, user) => {
//     if (user.id === userId) {
//       selectedUser = user;
//       return false; // break;
//     }
//   });

//   if (selectedUser !== undefined) {
//     $("#id").val(selectedUser.id);
//     $("#first_name").val(selectedUser.first_name);
//     $("#email").val(selectedUser.email);
//     $("#password").val(selectedUser.password);
//   }
// };

// initializeDatatable = (tableId, data) => {
//   new DataTable(tableId, {
//     columns: [
//       { data: "id" },
//       { data: "action" },
//       { data: "first_name" },
//       { data: "email" },
//       { data: "password" },
//     ],
//     data: data,
//   });
// };
