const form = document.querySelector("#search-form");
let image = document.querySelector("#image");
let info = document.querySelector("#info");

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
    let eachItemInfo = document.createElement("div");
    let description = document.createElement("p");
    img.src = data.drinks[i].strDrinkThumb;
    img.className = "display-image";
    drinkName.textContent = data.drinks[i].strDrink;
    drinkName.className = "drink-name";
    description.textContent = data.drinks[i].strInstructions;
    eachItemInfo.className = "description";
    eachItem.className = "each-item";

    eachItemInfo.append(drinkName, description);
    eachItem.append(img, eachItemInfo);
    info.append(eachItem);

    for (
      num = 1;
      typeof data.drinks[i][`strIngredient${num}`] === "string";
      num++
    ) {
      let li = document.createElement("li");
      let ingredients = data.drinks[i][`strIngredient${num}`];
      li.textContent = ingredients;
      console.log(li);
      eachItemInfo.append(li);
    }
  }
}

// hello