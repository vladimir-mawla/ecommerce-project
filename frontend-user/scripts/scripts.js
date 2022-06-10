var login_email = document.getElementById("login_email")
var login_password = document.getElementById("login_password")
document.getElementById("login_button").addEventListener("click", submit)
function submit() {
    if (login_email.value == "" || login_password.value == "") {
      
        alert("empty data")
    } else {let form = new FormData() 
      
        form.append("email", login_email.value);
        form.append("password", login_password.value);
        
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/api/login',
          data: form,
        })
    
        .then(function(response){

          if(response.data["error"] == "Unauthorized") {
            alert("Wrong email/password")
          } else {
            location.href='../users.html'
          }
        })
      }
  }