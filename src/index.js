const form = document.querySelector("#search-form");
let image = document.querySelector("#photo-holder");
let drinkInfo = document.querySelector("#info");
let table = document.querySelector("#cocktail-info");

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
    img.src = data.drinks[i].strDrinkThumb;
    drinkName.textContent = data.drinks[i].strDrink;
    img.className = "display-image";
    image.append(img);
    drinkInfo.append(drinkName);
    table.append(img, drinkName);
  }
}
