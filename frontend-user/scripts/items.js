window.onload = async function () {
  /*Login */
  document.getElementById("find-item").addEventListener("click", findItems);
  document.getElementById("get-favs").addEventListener("click", getFavs);
  document.getElementById("find-category").addEventListener("click", findCats);
  document.getElementById("logout").addEventListener("click", logout);

  var item_token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
  let search_cat_url = "http://127.0.0.1:8000/api/categories/getcatitems";
  var user_id;

  var access_token = localStorage.getItem("access_token");
  let profile_url = "http://127.0.0.1:8000/api/profile";

  await fetch(profile_url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text-plain, /",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": item_token,
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
        location.href = "./login.html";
      }
      user_id = res.data["id"];
      console.log(user_id);
      console.log("worked?");
    })

    .catch(function (error) {
      console.log(error);
    });
  function findItems(event) {
    event.preventDefault();
    console.log("hello");

    fetch("http://127.0.0.1:8000/api/items/searchitem", {
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
        var change = document.getElementById("get-favs");
        change.innerHTML = `<a onClick="window.location.reload();">Back to All Items</a>`;
        list_items.innerHTML = "";
        for (var i = 0; i < response.data["result"].length; i++) {
          var item = response.data["result"][i];

          const card = document.createElement("div");
          card.className = "item";
          card.innerHTML = `<div class ="item-img">
                              <img src="${item["img"]}" class="item-image">
                          </div>
                          <hr>
                          <div class="item-name">
                              <h2>${item["name"]}</h2>
                          </div>
                          <hr>
                          <div class="item-price">
                              <h3>${item["price"]}$ <a class="fav" id="${item["id"]}">&#x2764;</a></h3>
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
  var cat_search = document.getElementById("cat_search");
  var list_items = document.getElementById("list-items");

  fetch("http://127.0.0.1:8000/api/items/getitems", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text-plain, /",
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRF-TOKEN": item_token,
    },

    method: "post",
    credentials: "same-origin",
    body: JSON.stringify({
      user_id: user_id,
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
      for (var i = 0; i < response.data["items"].length; i++) {
        var item = response.data["items"][i];

        const card = document.createElement("div");
        card.className = "item";
        card.innerHTML = `<div class ="item-img">
                            <img src="${item["img"]}" class="item-image">
                        </div>
                        <hr>
                        <div class="item-name">
                            <h2>${item["name"]}</h2>
                        </div>
                        <hr>
                        <div class="item-price">
                            <h3>${item["price"]}$ <a class="fav" id="${item["id"]}">&#x2764;</a>	</h3>
                        </div>
                        `;

        //console.log(response.data["liked"])

        list_items.appendChild(card);
        fetch("http://127.0.0.1:8000/api/favorites/checkfavorite", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text-plain, /",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": item_token,
          },

          method: "post",
          credentials: "same-origin",
          body: JSON.stringify({
            user_id: user_id,
            item_id: item.id,
          }),
        })
          .then((response) =>
            response.json().then((data) => ({
              data: data,
              status: response.status,
            }))
          )

          .then((response) => {
            var e = document.getElementById(`${item["id"]}`);
            console.log(e);
            if (response.data["status"] == "liked") {
              e.style.color = "red";
            }
          })

          .catch(function (error) {
            console.log(error);
          });

        var e = document.getElementById(`${item["id"]}`);
        console.log(e);
        if (response.data["liked"] == "yes") {
          e.style.color = "red";
        } else if (response.data["liked"] == "no") {
          e.style.color = "black";
        }
      }
      var btn = document.getElementsByClassName("fav");
      var liked = [];
      for (let item of btn) {
        item.addEventListener("click", function onClick() {
          if (liked.includes(item.id)) {
            item.style.color = "black";
            // document.getElementById(`${item["id"]}`).className = "liked";
            console.log(item.id);

            fetch("http://127.0.0.1:8000/api/favorites/unfavorite", {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text-plain, /",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": item_token,
              },

              method: "post",
              credentials: "same-origin",
              body: JSON.stringify({
                user_id: user_id,
                item_id: item.id,
              }),
            })
              .then((response) =>
                response.json().then((data) => ({
                  data: data,
                  status: response.status,
                }))
              )

              .then((res) => {
                // let liked = document.getElementsByClassName("fav")
                // liked.id = "liked";
              })

              .catch(function (error) {
                console.log(error);
              });
            liked.filter(function (x) {
              return x !== item.id;
            });
            // console.log(liked)
          } else {
            item.style.color = "red";
            // document.getElementById(`${item["id"]}`).className = "liked";
            console.log(item.id);

            fetch("http://127.0.0.1:8000/api/favorites/favorite", {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text-plain, /",
                "X-Requested-With": "XMLHttpRequest",
                "X-CSRF-TOKEN": item_token,
              },

              method: "post",
              credentials: "same-origin",
              body: JSON.stringify({
                user_id: user_id,
                item_id: item.id,
              }),
            })
              .then((response) =>
                response.json().then((data) => ({
                  data: data,
                  status: response.status,
                }))
              )

              .then((res) => {
                // let liked = document.getElementsByClassName("fav")
                // liked.id = "liked";
              })

              .catch(function (error) {
                console.log(error);
              });
            liked.push(item.id);
            console.log(liked);
          }
        });
      }
    });

  function getFavs() {
    var change = document.getElementById("get-favs");
    change.innerHTML = `<a onClick="window.location.reload();">Back to All Items</a>`;
    var list_items = document.getElementById("list-items");

    fetch("http://127.0.0.1:8000/api/favorites/getfavorites", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text-plain, /",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": item_token,
      },

      method: "post",
      credentials: "same-origin",
      body: JSON.stringify({
        user_id: user_id,
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
                                  <img src="${favorite["img"]}" class="item-image">
                              </div>
                              <hr>
                              <div class="item-name">
                                  <h2>${favorite["name"]}</h2>
                              </div>
                              <hr>
                              <div class="item-price">
                                  <h3>${favorite["price"]}$ <a class="fav" id="${favorite["id"]}">&#x2764;</a></h3>
                              </div>
                              `;

          list_items.appendChild(card);
        }
      });
  }

  function findCats(event) {
    event.preventDefault();
    console.log(cat_search.value);
    fetch("http://127.0.0.1:8000/api/categories/getcatitems", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text-plain, /",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": item_token,
      },

      method: "post",
      credentials: "same-origin",
      body: JSON.stringify({
        category_id: cat_search.value,
      }),
    })
      .then((response) =>
        response.json().then((data) => ({
          data: data,
          status: response.status,
        }))
      )

      .then((response) => {
        var change = document.getElementById("get-favs");
        change.innerHTML = `<a onClick="window.location.reload();">Back to All Items</a>`;
        list_items.innerHTML = "";
        for (var i = 0; i < response.data["favorites"].length; i++) {
          var item = response.data["favorites"][i];

          const card = document.createElement("div");
          card.className = "item";
          card.innerHTML = `<div class ="item-img">
                            <img src="${item["img"]}" class="item-image">
                        </div>
                        <hr>
                        <div class="item-name">
                            <h2>${item["name"]}</h2>
                        </div>
                        <hr>
                        <div class="item-price">
                            <h3>${item["price"]}$ <a class="fav" id="${item["id"]}">&#x2764;</a></h3>
                        </div>
                        `;

          list_items.appendChild(card);
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  var cat = document.getElementById("cat_search");

  fetch("http://127.0.0.1:8000/api/categories/getcats", {
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
    .then(function (response) {
      console.log(response.data);
      for (var i = 0; i < response.data["name"].length; i++) {
        var category = document.createElement("option");
        category.setAttribute("value", response.data["name"][i]["id"]);
        category.innerHTML = response.data["name"][i]["name"];
        cat.appendChild(category);
      }
    });

  function logout() {
    fetch("http://127.0.0.1:8000/api/logout", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text-plain, /",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": item_token,
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
};
