document.getElementById("login_button").addEventListener("click", onClick);

let login_url = "http://127.0.0.1:8000/api/login";
let login_token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");
var access_token;
var login_email = document.getElementById("login_email");
var login_password = document.getElementById("login_password");
var user_type;

function onClick(event) {
  if (login_email.value == "" || login_password.value == "") {
    alert("Fill All Fields");
  } else {
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
    .then((response) =>
    response.json().then((data) => ({
      data: data,
      status: response.status,
    }))
  )


    .then((res) => {
      if (res.data["error"]) {
        alert("User not Found");
        login_email.value = "";
        login_password.value = "";
        die;
      } else if (res.data["access_token"]) {
        localStorage.setItem("access_token", res.data["access_token"]);

        (access_token = localStorage.getItem("access_token")),
          fetch("http://127.0.0.1:8000/api/profile", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json, text-plain, /",
              "X-Requested-With": "XMLHttpRequest",
              "X-CSRF-TOKEN": login_token,
              Authorization: `Bearer ${access_token}`,
              Accept: "application/json",
            },

            method: "post",
            credentials: "same-origin",
          })
            .then((response) =>
              response.json().then((data) => ({
                data: data,
                status: response.status,
              }))
            )

            .then((res) => {
              if (res.data["message"] == "Unauthenticated.") {
                alert("Session expired");
                location.href = "../admin_login.html";
              }
              user_type = res.data["user_type"];
              if (user_type == 0) {
                alert("You Are Not Autorized!");
              } else if (user_type == 1) {
                location.href = "./pages/admin.html";
              }
            })

            .catch(function (error) {
              console.log(error);
            })

            .catch(function (error) {
              console.log(error);
            });
      }
    });
  }
}
