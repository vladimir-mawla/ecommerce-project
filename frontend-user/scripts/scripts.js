var login_username = document.getElementById("login_email")
var login_password = document.getElementById("login_password")
document.getElementById("login_button").addEventListener("click", submit)
function submit() {
    if (login_username.value == "" || login_password.value == "") {
      
        alert("empty data")
    }
  }