const form = document.querySelector("#search-form");
let info = document.querySelector("#info");
let yesButton = document.querySelector("#random-button");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  info.textContent = "";
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e.target["new-name"].value}`
  )
    .then((res) => res.json())
    .then((data) => displayDrink(data))
    .catch((err) => console.log(err));
});

yesButton.addEventListener("click", (e) => {
  info.textContent = "";
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => displayDrink(data))
    .catch((err) => console.log(err));
});

function displayDrink(data) {
  for (i = 0; i < data.drinks.length; i++) {
    let img = document.createElement("img");
    let drinkName = document.createElement("h2");
    let eachItem = document.createElement("div");
    let eachItemInfo = document.createElement("div");
    let description = document.createElement("p");
    let emptyLike = document.createElement("span");
    let like = document.createElement("span");
    emptyLike.textContent = " ♡";
    like.textContent = emptyLike.textContent;
    let fullLike = document.createElement("span");
    fullLike.textContent = " ♥";
    fullLike.className = "full-like";
    img.src = data.drinks[i].strDrinkThumb;
    img.className = "display-image";
    drinkName.textContent = data.drinks[i].strDrink;
    drinkName.className = "drink-name";
    description.textContent = data.drinks[i].strInstructions;
    eachItemInfo.className = "description";
    eachItem.className = "each-item";

    eachItemInfo.append(drinkName, like, description);
    eachItem.append(img, eachItemInfo);
    info.append(eachItem);

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
        console.log(li);
        eachItemInfo.append(li);
      } else {
        li.textContent = ingredients;
        console.log(li);
        eachItemInfo.append(li);
      }
    }

    like.addEventListener("click", (e) => {
      console.log(e.target);

      if (e.target.textContent === emptyLike.textContent) {
        like.textContent = fullLike.textContent;
        favDrink = {
          strDrink: drinkName.textContent,
          strInstructions: description.textContent,
          strDrinkThumb: img.src,
        };
        addFavItem(favDrink);
      } else if (e.target.textContent === fullLike.textContent) {
        like.textContent = emptyLike.textContent;
        // removeFavItem(data);
      }
    });
  }
}

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
    .then((drink) => console.log(drink));
}
