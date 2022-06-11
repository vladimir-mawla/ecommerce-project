// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.



document.getElementById("add_item").addEventListener("click", onClick); 

let login_url = "http://127.0.0.1:8000/api/items/additem";
let login_token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

function onClick(event) {

  event.preventDefault();
  console.log("hello");

  var add_img = document.getElementById("add_img");
  var add_name = document.getElementById("add_name");
  var add_price = document.getElementById("add_price");
  var add_cat = document.getElementById("add_cat");


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
        img: add_img.value,
        name: add_name.value,
        price: add_price.value,
        category_id: add_cat.value,
      }),
  })

    .then((response) =>
      response.json().then((data) => ({
        data: data,
        status: response.status,
      }))
    )

    .then((res) => {
      
    })
    
    .catch(function (error) {
      console.log(error);
    });
}