// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

document.getElementById("add-cat-form").addEventListener("click", addNewCat);
document.getElementById("add_item").addEventListener("click", onClick);
document.getElementById("logout").addEventListener("click", logout);
var access_token = localStorage.getItem("access_token");
let login_token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content");




  var cat = document.getElementById("add_cat");

  fetch("http://127.0.0.1:8000/api/categories/getcats", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text-plain, /",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": login_token,
    },
    method: "get",
    credentials: "same-origin",
  })
    .then((response) =>
      response.json().then((data) => ({
        data: data,
        status: response.status,
      }))
    )
    .then(function (response) {
      console.log(response.data);
      for (var i = 0; i < response.data["name"].length; i++) {
        var category = document.createElement("option");
        category.setAttribute("value", response.data["name"][i]["id"]);
        category.innerHTML = response.data["name"][i]["name"];
        cat.appendChild(category);
      }
    });




function addNewCat(event) {
  event.preventDefault();
  var change = document.getElementById("form");
  change.innerHTML = "";

  const form = document.createElement("div");
  form.className = "item";
  form.innerHTML = `<form>
        <div class="upload_form">
          <input type="text" placeholder="Category's name" id="add_name">
          <div><button id="submit-cat">Submit</button></div>
        </div>
      </form>
                        `;

  change.appendChild(form);
  document.getElementById("submit-cat").addEventListener("click", submitCat);

  function submitCat() {
    fetch("http://127.0.0.1:8000/api/categories/addcat", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text-plain, /",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": login_token,
      },
      method: "post",
      credentials: "same-origin",
      body: JSON.stringify({
        name: add_name.value,
      }),
    }).then((response) =>
      response.json().then((data) => ({
        data: data,
        status: response.status,
      }))
    );
  }
}

function onClick(event) {
  event.preventDefault();
  console.log("hello");

  let add_img = document.getElementById("add_img");
  let add_name = document.getElementById("add_name");
  let add_price = document.getElementById("add_price");
  let add_cat = document.getElementById("add_cat");

  var s;
  var file = add_img.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    s = reader.result;

    fetch("http://127.0.0.1:8000/api/items/additem", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text-plain, /",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": login_token,
      },
      method: "post",
      credentials: "same-origin",
      body: JSON.stringify({
        image: s,
        name: add_name.value,
        price: add_price.value,
        category_id: add_cat.value,
      }),
    }).then((res) => {
      console.log(res);
    });
  };
  reader.readAsDataURL(file);
}

function logout() {
  fetch("http://127.0.0.1:8000/api/logout", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text-plain, /",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": login_token,
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
    },
    method: "post",
  })
    .then((response) =>
      response.json().then((data) => ({
        data: data,
        status: response.status,
      }))
    )

    .then((response) => {
      location.href = "../index.html";
    });
}
