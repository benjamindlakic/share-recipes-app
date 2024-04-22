var users = [];
var idCounter = 1;

$("#register-form").validate({
  rules: {
    first_name: {
      required: true,
      minlength: 5,
    },
    username: {
      required: true,
      minlength: 5,
    },
    password: {
      required: true,
      minlength: 5,
    },
    email: {
      required: true,
      email: true,
    },
    confirm_password: {
      //   equalTo: "#password",
    },
  },
  messages: {
    first_name: {
      required: "You have to fill it in!",
      minlength: "Too short buddy.!",
    },
    confirm_password: {
      //   equalTo: "The password and confirm password fields should be the same",
    },
  },
  submitHandler: function (form, event) {
    event.preventDefault();
    blockUi("#register-form");
    let data = serializeForm(form);
    users.push(data);
    $("#register-form")[0].reset();
    console.log(users);
    unblockUi("#register-form");
    window.location.href = "#login";
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
    title: {
      required: true,
      minlength: 5,
    },
    description: {
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
    preptime: {
      required: true,
      minlength: 1,
    },
  },
  messages: {
    title: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
    description: {
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
    preptime: {
      required: "You have to fill it in!",
      minlength: "Too short buddy!",
    },
  },
  submitHandler: function (form, event) {
    event.preventDefault();
    blockUi("#upload-recipe-form");
    serializeForm(form);
    
      var user = $('#UserID').val();
      var title = $('#Title').val();
      var description = $('#Description').val();
      var instructions = $('#PreparationSteps').val();
      var preptime = $('#CookingTime').val();
      var image = $('#ImageURL').val();

      var recipeData = {
        UserID: user, 
        Title: title, 
        Description: description, 
        PreparationSteps: instructions, 
        CookingTime: preptime, 
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
