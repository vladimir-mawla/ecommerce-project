/*Login */
document.getElementById("login_button").addEventListener("click", onClick); 

let login_url = "http://127.0.0.1:8000/api/login";
let login_token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

function onClick(event) {

  event.preventDefault();
  console.log("hello");

  var login_email = document.getElementById("login_email");
  var login_password = document.getElementById("login_password");

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

    .then((response) =>
      response.json().then((data) => ({
        data: data,
        status: response.status,
      }))
    )

    .then((res) => {
      console.log(res.data);
      var access_token = res.data["access_token"]
      localStorage.setItem('access_token', access_token)
      if (res.data["error"] == "Unauthorized") {
        alert("User not Found");
      } else {
        location.href = "../index.html";
      }
    })
    
    .catch(function (error) {
      console.log(error);
    });
}
