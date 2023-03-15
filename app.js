const inputSearch = document.querySelector("[data-input-search]");

const searchListContainer = document.querySelector(".search-list");

inputSearch.addEventListener("keyup", searchHero);

function searchHero(e) {
  const value = e.target.value;

  if (value.length > 1) {
    heroApi(value);
  } else {
    searchListContainer.innerHTML = "";
  }
}

let dataHero;

async function heroApi(search) {
  const url = `https://www.superheroapi.com/api.php/5961063670676890/search/${search}`;

  await fetch(url)
    .then((resp) => resp.json())
    .then((json) => (dataHero = json));

  init(dataHero.results);
}

let filterName = [];

function init(data) {
  searchListContainer.innerHTML = "";

  const searchItem = document.createElement("div");
  searchItem.classList.add("search-list-item");

  if (data) {
    searchListContainer.style.display = "block";
    filterName = data.filter((name) => name.name);
  } else {
    searchListContainer.style.display = "none";
  }

  filterName.forEach((data) => {
    searchListContainer.innerHTML += `<div class="search-list-item">
              <img src="${data.image.url}" alt="" />
              <p class="heroSearch" id="${data.id}">${data.name}</p>
          </div>`;
    wantedHero();
  });
}

function wantedHero() {
  const hero = document.querySelectorAll(".heroSearch");
  hero.forEach((btn) => btn.addEventListener("click", heroSearched));
}

const features = document.querySelectorAll(".tab-body-single");

function heroSearched(e) {
  const value = e.target;

  const filterId = filterName.filter((name) => name.id === value.id);

  const thumbnailContainer = document.querySelector(
    ".app-body-content-thumbnail"
  );
  const name = document.querySelector(".name-hero");
  const tabHead = document.querySelector(".app-body-tabs-head");

  thumbnailContainer.innerHTML = `

              <div class="app-body-content-thumbnail">
                <img class="thumbnail" src="${filterId[0].image.url}" />
              </div>
              `;

  name.innerHTML = `<div class="name">${filterId[0].name}</div>`;

  powerstats.innerHTML = `
  <li>
  <div>
    <i class="fa-solid fa-shield-halved"></i>
    <span>intelligence</span>
  </div>
  <span class="intelligence">${filterId[0].powerstats.intelligence}</span>
</li>
<li>
  <div>
    <i class="fa-solid fa-shield-halved"></i>
    <span>strength</span>
  </div>
  <span class="strength">${filterId[0].powerstats.strength}</span>
</li>
<li>
  <div>
    <i class="fa-solid fa-shield-halved"></i>
    <span>speed</span>
  </div>
  <span class="speed">${filterId[0].powerstats.speed}</span>
</li>
<li>
  <div>
    <i class="fa-solid fa-shield-halved"></i>
    <span>durability</span>
  </div>
  <span class="durability">${filterId[0].powerstats.durability}</span>
</li>
<li>
  <div>
    <i class="fa-solid fa-shield-halved"></i>
    <span>power</span>
  </div>
  <span class="power">${filterId[0].powerstats.power}</span>
</li>
<li>
  <div>
    <i class="fa-solid fa-shield-halved"></i>
    <span>combat</span>
  </div>
  <span class="combat">${filterId[0].powerstats.combat}</span>
</li>
  `;

  biography.innerHTML = `
  <li>
    <span>full name</span>
    <span>${filterId[0].biography["full-name"]}</span>
    </li>
    <li>
    <span>alert-egos</span>
    <span>${filterId[0].biography["alter-egos"]}</span>
    </li>
    <li>
    <span>aliases</span>
    <span>${filterId[0].biography.aliases}</span>
    </li>
    <li>
    <span>place-of-birth</span>
    <span>${filterId[0].biography["place-of.birth"]}</span>
    </li>
    <li>
    <span>first-apperance</span>
    <span>${filterId[0].biography["first-appearance"]}</span>
                    </li>
    <li>
    <span>publisher</span>
    <span>${filterId[0].biography.publisher}</span>
    </li>
  `;

  appearance.innerHTML = `
  <li>
    <span> <i class="fas fa-star"></i> gender </span>
    <span>${filterId[0].appearance.gender}</span>
    </li>
    <li>
    <span> <i class="fas fa-star"></i> race </span>
    <span>${filterId[0].appearance.race}</span>
    </li>
    <li>
    <span> <i class="fas fa-star"></i> height </span>
    <span>${filterId[0].appearance.height}</span>
    </li>
    <li>
    <span> <i class="fas fa-star"></i> weight </span>
    <span>${filterId[0].appearance.weight}</span>
    </li>
    <li>
    <span> <i class="fas fa-star"></i> eye-color </span>
    <span>${filterId[0].appearance["eye-color"]}</span>
    </li>
    <li>
    <span> <i class="fas fa-star"></i> hair-color </span>
    <span>${filterId[0].appearance["hair-color"]}</span>
 </li>
  `;

  connections.innerHTML = `
  <li>
        <span>group--affiliation</span>
        <span>${filterId[0].connections["group-affiliation"]}</span>
        </li>
        <li>
        <span>relatives</span>
        <span>${filterId[0].connections.relatives}</span
        
     </li>
  `;

  searchListContainer.innerHTML = "";
}

const powerstats = document.querySelector(".powerstats");
const biography = document.querySelector(".biography");
const appearance = document.querySelector(".appearance");
const connections = document.querySelector(".connections");

const btnPowerStats = document.querySelector("[data-power]");
const btnBiography = document.querySelector("[data-biography]");
const btnAppearance = document.querySelector("[data-appearance]");
const btnConnections = document.querySelector("[data-connections]");

btnPowerStats.addEventListener("click", () => {
  btnPowerStats.classList.add("active-tab");
  btnBiography.classList.remove("active-tab");
  btnAppearance.classList.remove("active-tab");
  btnConnections.classList.remove("active-tab");

  powerstats.style.display = "block";
  biography.style.display = "none";
  appearance.style.display = "none";
  connections.style.display = "none";
});

btnBiography.addEventListener("click", () => {
  btnBiography.classList.add("active-tab");
  btnPowerStats.classList.remove("active-tab");
  btnAppearance.classList.remove("active-tab");
  btnConnections.classList.remove("active-tab");
  powerstats.style.display = "none";
  biography.style.display = "block";
  appearance.style.display = "none";
  connections.style.display = "none";
});

btnAppearance.addEventListener("click", () => {
  btnAppearance.classList.add("active-tab");
  btnBiography.classList.remove("active-tab");
  btnPowerStats.classList.remove("active-tab");
  btnConnections.classList.remove("active-tab");
  powerstats.style.display = "none";
  biography.style.display = "none";
  appearance.style.display = "block";
  connections.style.display = "none";
});

btnConnections.addEventListener("click", () => {
  btnAppearance.classList.remove("active-tab");
  btnBiography.classList.remove("active-tab");
  btnPowerStats.classList.remove("active-tab");
  btnConnections.classList.add("active-tab");
  powerstats.style.display = "none";
  biography.style.display = "none";
  appearance.style.display = "none";
  connections.style.display = "block";
});
