/*Signup */
document.getElementById("signup_button").addEventListener("click", onClick);


let signup_url = "http://127.0.0.1:8000/api/register";
let signup_token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

var signup_name = document.getElementById("signup_name");
var signup_email = document.getElementById("signup_email");
var signup_password = document.getElementById("signup_password");
var signup_password_confirmation = document.getElementById("signup_password_confirmation");

function onClick(event) {
    if (signup_name.value == "" || signup_email.value == "" || signup_password.value == "" || signup_password_confirmation.value == ""){
        alert("Fill All Fields")
    }else {
        
  event.preventDefault();
  console.log("hello");



  fetch(signup_url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text-plain, /",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": signup_token,
    },


    method: "post",
    credentials: "same-origin",
    body: JSON.stringify({
      name: signup_name.value,
      email: signup_email.value,
      password: signup_password.value,
      password_confirmation: signup_password_confirmation.value,
    }),
  })


    .then((response) =>
      response.json().then((data) => ({
        data: data,
        status: response.status,
      }))
    )

    .then((res) => {
      if (res.data["email"] == "The email must be a valid email address.") {
        alert("Enter a Valid Email Address");
      } else if (res.data["email"] == "The email has already been taken.") {
        alert("User already Registered");
      } else if (
        res.data["password"] == "The password confirmation does not match."
      ) {
        alert("Password doesn't match");
      } else if (
        res.data["password"] == "The password must be at least 6 characters."
      ) {
        alert("Password too short");
      } else {
        location.href = "../index.html";
      }
    })

    .catch(function (error) {
      console.log(error);
    });
}}
