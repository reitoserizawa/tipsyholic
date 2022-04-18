const form = document.querySelector("#search-form");
let image = document.querySelector("#image");
let info = document.querySelector("#info");
let fullInfo = document.querySelector("#full-info");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e.target["new-name"].value}`
  )
    .then((res) => res.json())
    .then((data) => displayDrink(data))
    .catch((err) => console.log(err));
});

function displayDrink(data) {
  for (i = 0; i < data.drinks.length; i++) {
    let img = document.createElement("img");
    let drinkName = document.createElement("h2");
    let eachItem = document.createElement("div");
    img.src = data.drinks[i].strDrinkThumb;
    img.className = "display-image";
    drinkName.textContent = data.drinks[i].strDrink;
    drinkName.className = "drink-name";
    // image.append(img);
    eachItem.append(img, drinkName);
    info.append(eachItem);
    //debugger;
  }
}
