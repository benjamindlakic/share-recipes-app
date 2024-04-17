
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