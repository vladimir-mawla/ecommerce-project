document.getElementById("login_button").addEventListener("click", onClick); 

let login_url = "http://127.0.0.1:8000/api/login";
let login_token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
var access_token;
var login_email = document.getElementById("login_email");
var login_password = document.getElementById("login_password");
function onClick(event) {
    if (login_email.value == "" || login_password.value == ""){
        alert("Fill All Fields")
    }else {
  event.preventDefault();
  console.log("hello");



  fetch(login_url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text-plain, /",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": login_token,
    },

    method: "post",
    credentials: "same-origin",
    body: JSON.stringify({
      email: login_email.value,
      password: login_password.value,
    }),
  })
  .then(response =>
    response.json().then(data => ({
        data: data,
        status: response.status
    })
    )).then(res => {
        
        console.log(res.data)
        if(res.data["access_token"]){
          
          localStorage.setItem('access_token', res.data["access_token"]);
          location.href = "../index.html"

        }else {
            alert("User not Found")
        }
    })

    .catch(function (error) {
      console.log(error);
    });
}}