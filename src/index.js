// Declaring variables in the global

const form = document.querySelector("#search-form");
let info = document.querySelector("#info");
let yesButton = document.querySelector(".random-button");
let allInfo = document.getElementById("all-info").offsetTop;
let lightModeButton = document.querySelector("#light-mode-button");
let favoriteDrinks = document.getElementById("fav-drinks");
const favHeading = document.querySelector("#fav-heading");
const favButton = document.querySelector("#fav-button");
const reloadButton = document.querySelector("#logo");

// Adding a 'submit' event to the search bar, fetching through external API

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (e.target["new-name"].value === "")
    alert("YOU FORGOT TO ENTER A DRINK 🍸");
  else {
    info.textContent = "";
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e.target["new-name"].value}`
    )
      .then((res) => res.json())
      .then((data) => {
        displayDrink(data);
        window.scrollTo({ top: allInfo, behavior: "smooth" });
      })
      .catch((err) => console.log(err));
    form.reset();
  }
});

// Adding a 'click' event to random cocktails

yesButton.addEventListener("click", (e) => {
  info.textContent = "";
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      displayDrink(data);
      window.scrollTo({ top: allInfo, behavior: "smooth" });
    })
    .catch((err) => console.log(err));
});

// function for displaying all the drink data

function displayDrink(data) {
  for (i = 0; i < data.drinks.length; i++) {
    // Creating each element

    let img = document.createElement("img");
    let drinkName = document.createElement("h2");
    let description = document.createElement("p");
    let emptyLike = document.createElement("span");
    let like = document.createElement("span");
    let fullLike = document.createElement("span");
    let eachItem = document.createElement("div");
    let eachItemInfo = document.createElement("div");

    // Inserting image src, drink name and description to created elements

    img.src = data.drinks[i].strDrinkThumb;
    img.className = "display-image";
    drinkName.textContent = data.drinks[i].strDrink;
    drinkName.className = "drink-name";
    description.textContent = data.drinks[i].strInstructions;
    like.style.color = "#d36699";

    // Appending each information

    eachItemInfo.className = "description";
    eachItemInfo.append(drinkName, description);

    eachItem.className = "each-item";
    eachItem.append(img, eachItemInfo);

    info.append(eachItem);

    //  Adding mouse-events to each appended picture

    eachItem.addEventListener("mouseover", function () {
      eachItem.style.filter = "brightness(1.0)";
      eachItem.style.opacity = "100%";
      //  img.style.transition = "all ease-in-out 3s";
    });
    eachItem.addEventListener("mouseout", function () {
      // img.style.transition = "all 3s ease-in-out";
      eachItem.style.filter = "grayscale(100)";
      eachItem.style.opacity = "30%";
    });

    // Adding each ingredients and measurements to the drink information
    // Using a loop as the data shown as 'strMeasure1', 'strMeasure2', etc.

    for (
      num = 1;
      typeof data.drinks[i][`strIngredient${num}`] === "string";
      num++
    ) {
      let li = document.createElement("li");
      let ingredients = data.drinks[i][`strIngredient${num}`];
      let measure = data.drinks[i][`strMeasure${num}`];

      if (Boolean(measure) === true) {
        li.textContent = ingredients + " - " + measure;
        eachItemInfo.append(li, like);
      } else {
        li.textContent = ingredients;
        eachItemInfo.append(li, like);
      }
    }

    // Inserting a 'like' button information to created elements

    like.className = "like-button";
    emptyLike.textContent = " ♡";
    like.textContent = emptyLike.textContent;
    fullLike.textContent = " ♥";
    fullLike.className = "full-like";

    // Adding an event to like button to change a color
    // Event calls add fav item function OR delete fav item function

    like.addEventListener("click", (e) => {
      if (e.target.textContent === emptyLike.textContent) {
        like.textContent = fullLike.textContent;
        like.style.color = "#d36699";
        // Creating new element to put it in local db
        favDrink = {
          strDrink: drinkName.textContent,
          strInstructions: description.textContent,
          strDrinkThumb: img.src,
        };
        addFavItem(favDrink);
      } else if (e.target.textContent === fullLike.textContent) {
        like.textContent = emptyLike.textContent;
        removeFavItem(favDrink);
      }
    });
  }
}

// Clicking heart will add to the local db.json file

function addFavItem(data) {
  fetch("http://localhost:3000/drinks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((drink) => favDrinks(drink));
}

// Removing item from div with favorite drinks

function removeFavItem(data) {
  let photo = document.querySelector("#fav-drinks").getElementsByTagName("img");
  Array.from(photo).forEach(function (element) {
    if (element.currentSrc === data.strDrinkThumb) {
      element.remove();

      // using fetch to access stored db

      fetch(`http://localhost:3000/drinks/`)
        .then((res) => res.json())
        .then((newData) => {
          newData.forEach((item) => {
            if (item.strDrink === data.strDrink) {
              removeItemFromDataBase(item.id);
            }
          });
        })

        .catch((err) => console.log(err));
    }
  });

  // Removing object from local db

  function removeItemFromDataBase(id) {
    fetch(`http://localhost:3000/drinks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => response.json());
    //     .then((dataBase) => console.log(dataBase));
  }
}

// Adding photo to a favorite div element

function favDrinks(drink) {
  let favPhoto = document.createElement("img");
  favPhoto.className = "fav-photo";
  favPhoto.src = drink.strDrinkThumb;
  favoriteDrinks.append(favPhoto);
}

// Switching to light mode

lightModeButton.addEventListener("click", () => {
  var element = document.body;
  element.classList.toggle("light-mode");
  if (lightModeButton.textContent === " light mode") {
    lightModeButton.textContent = " dark mode";
  } else if (lightModeButton.textContent === " dark mode") {
    lightModeButton.textContent = " light mode";
  }
});

favButton.addEventListener("click", () => {
  let favSection = document.getElementById("fav-section").offsetTop;
  window.scrollTo({ top: favSection, behavior: "smooth" });
});

// Event listeners for reload

reloadButton.addEventListener("click", reload, false);

// Reloading the page

function reload() {
  reload = location.reload();
}
