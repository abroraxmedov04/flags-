let darkMode = window.localStorage.getItem("darkMode");
if (darkMode === "true") {
  document.body.classList.add("dark");
}

let btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    window.localStorage.setItem("darkMode", "true");
  } else {
    window.localStorage.removeItem("darkMode");
  }
});

let mainFragment = new DocumentFragment();
let flagFragment = document.querySelector(".flag-card").content;
let form = document.querySelector(".form");
let input = document.querySelector(".input-search");
let list = document.querySelector(".flag-list");
let option = document.querySelector(".select-option");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputValue = input.value.trim();
  let optionValue = option.value;

  console.log("Search:", inputValue);
  console.log("Option:", optionValue);

  searchAndFilter(inputValue, optionValue);

  input.value = "";
});

async function searchAndFilter(search, option) {
  try {
    let API_URL;

    if (option === "all") {
      API_URL = `https://restcountries.com/v3.1/name/${search}`;
    } else {
      API_URL = `https://restcountries.com/v3.1/region/${option}`;
    }

    let response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to search");
    }

    let data = await response.json();

    if (data.length === 0) {
      throw new Error("No matching countries found");
    }

    renderList(data, list);
  } catch (error) {
    console.error("Error:", error.message);
    alert("No matching countries found. Please enter a valid search term.");
  }
}

async function getData() {
  try {
    let response = await fetch("https://restcountries.com/v3.1/all");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    let data = await response.json();

    renderList(data, list);
  } catch (error) {
    console.error("Error:", error.message);
    alert("Failed to fetch country data. Please try again later.");
  }
}

function renderList(data, node) {
  node.innerHTML = "";

  data.forEach((item) => {
    let clone = flagFragment.cloneNode(true);
    clone.querySelector(".card-flag").dataset.id = item.area;
    clone.querySelector(".flag-image").src = item.flags.png || "";
    clone.querySelector(".country-name").textContent =
      item.name.common || "N/A";
    clone.querySelector(".country-population").textContent = `Population: ${
      item.population || "N/A"
    }`;
    clone.querySelector(".country-region").textContent = `Region: ${
      item.region || "N/A"
    }`;
    clone.querySelector(".country-capital").textContent = `Capital: ${
      item.capital?.[0] || "N/A"
    }`;

    node.appendChild(clone);
  });
}

list.addEventListener("click", (e) => {
  console.log(e);
  if (e.target.matches(".card-flag")) {
    console.log("Hi");
  }
});

getData();
