var login_email = document.getElementById("login_email")
var login_password = document.getElementById("login_password")
document.getElementById("login_button").addEventListener("click", submit)
function submit() {
    if (login_email.value == "" || login_password.value == "") {
      
        alert("empty data")
    } 
  }