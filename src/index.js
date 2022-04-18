const form = document.querySelector("#search-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target["new-name"].value);
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e.target["new-name"].value}`
  )
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
