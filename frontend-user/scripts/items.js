window.onload = async function () {
  /*Login */
  document.getElementById("find-item").addEventListener("click", findItems);
  document.getElementById("get-favs").addEventListener("click", getFavs);
  let search_item_url = "http://127.0.0.1:8000/api/items/searchitem";
  let item_token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

  function findItems(event) {
    event.preventDefault();
    console.log("hello");

    fetch(search_item_url, {
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

      .then((response) => {
        var change = document.getElementById("get-favs")
        change.innerHTML = `<a onClick="window.location.reload();">Back to All Items</a>`;
        list_items.innerHTML = "";
        for (var i = 0; i < response.data["result"].length; i++) {
          var item = response.data["result"][i];
  
          const card = document.createElement("div");
          card.className = "item";
          card.innerHTML = `<div class ="item-img">
                              <img src="${item["image"]}" class="item-image">
                          </div>
                          <hr>
                          <div class="item-name">
                              <h2>${item["name"]}</h2>
                          </div>
                          <hr>
                          <div class="item-price">
                              <h3>${item["price"]} $</h3>
                          </div>
                          `;
  
          list_items.appendChild(card);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  let item_url = "http://127.0.0.1:8000/api/items/getitems";
  var item_search = document.getElementById("item_search");
  var list_items = document.getElementById("list-items");

  await fetch(item_url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text-plain, /",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": item_token,
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

    .then((response) => {
      list_items.innerHTML = "";
      for (var i = 0; i < response.data["items"].length; i++) {
        var item = response.data["items"][i];

        const card = document.createElement("div");
        card.className = "item";
        card.innerHTML = `<div class ="item-img">
                            <img src="${item["image"]}" class="item-image">
                        </div>
                        <hr>
                        <div class="item-name">
                            <h2>${item["name"]}</h2>
                        </div>
                        <hr>
                        <div class="item-price">
                            <h3>${item["price"]} $</h3>
                        </div>
                        `;

        list_items.appendChild(card);
      }
    });

  var user_id;

  var access_token = localStorage.getItem("access_token");
  let profile_url = "http://127.0.0.1:8000/api/profile";

  fetch(profile_url, {
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
      user_id = res.data["id"];
      console.log(user_id);
      console.log("worked?");
    })

    .catch(function (error) {
      console.log(error);
    });

  function getFavs() {
      var change = document.getElementById("get-favs")
      change.innerHTML = `<a onClick="window.location.reload();">Back to All Items</a>`;
    let favs_url = "http://127.0.0.1:8000/api/favorites/getfavorites";
    var list_items = document.getElementById("list-items");
    fetch(favs_url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text-plain, /",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": item_token,
      },

      method: "post",
      credentials: "same-origin",
      body: JSON.stringify({
        user_id: "7",
      }),
    })
      .then((response) =>
        response.json().then((data) => ({
          data: data,
          status: response.status,
        }))
      )

      .then((response) => {
        list_items.innerHTML = "";
        for (var i = 0; i < response.data["favorites"].length; i++) {
          var favorite = response.data["favorites"][i];

          const card = document.createElement("div");
          card.className = "item";
          card.innerHTML = `<div class ="item-img">
                                  <img src="${favorite["image"]}" class="item-image">
                              </div>
                              <hr>
                              <div class="item-name">
                                  <h2>${favorite["name"]}</h2>
                              </div>
                              <hr>
                              <div class="item-price">
                                  <h3>${favorite["price"]} $</h3>
                              </div>
                              `;

          list_items.appendChild(card);
        }
      });
  }
};
