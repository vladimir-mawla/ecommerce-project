// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.



document.getElementById("add_item").addEventListener("click", onClick); 


let login_token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

function onClick(event) {

  event.preventDefault();
  console.log("hello");

  let add_img = document.getElementById("add_img");
  let add_name = document.getElementById("add_name");
  let add_price = document.getElementById("add_price");
  let add_cat = document.getElementById("add_cat");
  console.log(add_img.value)
  console.log(add_name.value)
  console.log(add_price.value)
  console.log(add_cat.value)

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
        image: add_img.value,
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
      if(res.data["message"]){
        alert("price must be integer")
      }

      
    })
    
    .catch(function (error) {
      console.log(error);
    });
    add_img.value = '';
    add_name.value = '';
    add_price.value = '';
    add_cat.value = '';
}