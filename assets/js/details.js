function getUserDetails(userId) {
  $.ajax({
    url: "http://localhost/share-recipes-app/backend/api/users",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    success: function (data) {
      var user = data.find(function (user) {
        return user.id === userId;
      });
      if (user) {
        var userDetailsHtml = `
          <img src="${user.ProfilePicture}" alt="Profile Picture" class="img-fluid rounded-circle" style="width: 150px; height: 150px;">
          <h2 class="mt-3">${user.Firstname} ${user.Lastname}</h2>
        `;
        $("#userDetailsContainer").html(userDetailsHtml);
      }
    },
  });
}