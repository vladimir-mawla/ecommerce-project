/*Login */
document.getElementById("find-item").addEventListener("click", onClick); 

let item_url = "http://127.0.0.1:8000/api/items/searchitem";
let item_token = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

function onClick(event) {

  event.preventDefault();
  console.log("hello");

  var item_search = document.getElementById("item_search");
  

  fetch(item_url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text-plain, /",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": item_token,
    },

    method: "post",
    credentials: "same-origin",
    body: JSON.stringify({
      name: item_search.value,
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
      if (res.data["error"] == "Unauthorized") {
        alert("User not Found");
      } else {
        location.href = "../items.html";
      }
    })
    
    .catch(function (error) {
      console.log(error);
    });
}