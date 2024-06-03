var token = localStorage.getItem('token');
if(token){
$(document).ready(function () {
    getRecipes();
    getUsers();

  });
}else{
    window.location.href = '#login';
}