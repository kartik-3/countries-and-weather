const allCountriesUrl = "https://restcountries.eu/rest/v2/all";
const countryUrl = "https://restcountries.eu/rest/v2/name/";
const cityWeather = "https://api.openweathermap.org/data/2.5/weather?q=";
const weatherAppId = "&appid=767422ec9fdb76b3f5cbec369fe71574";

let row = [],
  col = [],
  card = [],
  card_header = [],
  card_body = [],
  btn = [],
  flag_img = [],
  ul = [],
  li1 = [],
  li2 = [],
  li3 = [],
  li4 = [];

const container = document.createElement("div");
container.classList.add("container");
document.body.appendChild(container);

const fetchCountry = (url) => {
  return new Promise((res, rej) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => res(data))
      .catch((e) => rej(e));
  });
};

fetchCountry(allCountriesUrl).then((countries) => {
  let countryCount = 0;
  let rowNum = -1;
  const fetchData = (countryName) => {
    fetchCountry(countryUrl + countryName).then((country) => {
      if (countryCount == 0 || countryCount % 3 == 0) {
        createRow(++rowNum);
      }

      createCard(country, countryCount, rowNum);

      countryCount++;
      if (countryCount < countries.length) {
        fetchData(countries[countryCount].name);
      }
    });
  };
  fetchData(countries[0].name);
});

const createRow = (rowNum) => {
  row[rowNum] = document.createElement("div");
  row[rowNum].classList.add("row");
  container.appendChild(row[rowNum]);
};

const createCard = (country, index, rowNum) => {
  col[index] = document.createElement("div");
  col[index].classList.add("col-lg-4");
  col[index].classList.add("col-sm-12");
  row[rowNum].appendChild(col[index]);

  card[index] = document.createElement("div");
  card[index].classList.add("card");
  col[index].appendChild(card[index]);

  card_header[index] = document.createElement("div");
  card_header[index].classList.add("card-header");
  card_header[index].innerText = country[0].name;
  card[index].appendChild(card_header[index]);

  flag_img[index] = document.createElement("div");
  flagShow(country, index);
  card[index].appendChild(flag_img[index]);

  card_body[index] = document.createElement("div");
  card_body[index].classList.add("card-body");
  countryInfo(country, index);
  card[index].appendChild(card_body[index]);

  btn[index] = document.createElement("button");
  btn[index].setAttribute("type", "button");
  btn[index].classList.add("btn");
  btn[index].classList.add("btn-primary");
  btn[index].innerText = "Check weather";
  card[index].appendChild(btn[index]);

  btn[index].addEventListener("click", function (event) {
    checkWeather(country, index);
  });
};

const checkWeather = (country) => {
  fetch(cityWeather + country[0].capital + weatherAppId)
    .then((res) => res.json())
    .then((data) => {
      let currWeather = (data.main.temp - 273.15).toFixed(2) + " C";
      swal({
        title: "Weather in " + country[0].capital + " is",
        text: currWeather,
        icon: "info",
        button: "Okay!",
      });
    });
};

const countryInfo = (country, index) => {
  ul[index] = document.createElement("ul");
  ul[index].classList.add("list-group");
  ul[index].classList.add("list-group-flush");
  card_body[index].appendChild(ul[index]);

  li1[index] = document.createElement("li");
  li1[index].classList.add("list-group-item");
  li1[index].innerText = "Capital: " + country[0].capital;
  ul[index].appendChild(li1[index]);

  li2[index] = document.createElement("li");
  li2[index].classList.add("list-group-item");
  li2[index].innerText = "Region: " + country[0].region;
  ul[index].appendChild(li2[index]);

  li3[index] = document.createElement("li");
  li3[index].classList.add("list-group-item");
  li3[index].innerText = "Latitude and Longitude: " + country[0].latlng;
  ul[index].appendChild(li3[index]);

  li4[index] = document.createElement("li");
  li4[index].classList.add("list-group-item");
  li4[index].innerText =
    "Country Codes: " + country[0].alpha2Code + ", " + country[0].alpha3Code;
  ul[index].appendChild(li4[index]);
};

const flagShow = (country, index) => {
  flag_img[index] = document.createElement("img");
  flag_img[index].classList.add("card-img-top");
  flag_img[index].setAttribute("src", country[0].flag);
};
