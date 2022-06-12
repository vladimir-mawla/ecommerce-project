// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.



document.getElementById("add_item").addEventListener("click", onClick); 
document.getElementById("logout").addEventListener("click", logout);
var access_token = localStorage.getItem("access_token");
let login_token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

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
    reader.onloadend = function() {
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
      })
        .then((res) => {
          console.log(res)
        })
      
        
    }
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