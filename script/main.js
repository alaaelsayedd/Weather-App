let weatherStatus = {};
let Cards , date;
let containerCard = document.getElementsByClassName("card-cont")[0];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let directionMapping = {
  N: "North",
  NNE: "North-Northeast",
  NE: "Northeast",
  ENE: "East-Northeast",
  E: "East",
  ESE: "East-Southeast",
  SE: "Southeast",
  SSE: "South-Southeast",
  S: "South",
  SSW: "South-Southwest",
  SW: "Southwest",
  WSW: "West-Southwest",
  W: "West",
  WNW: "West-Northwest",
  NW: "Northwest",
  NNW: "North-Northwest",
};

async function getWeather(searchCity) {
  var res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=50ec8fb2d49c44dc82c110500241504&q=${searchCity}&days=3&aqi=yes&alerts=yes`
  );
  var data = await res.json();

  return data;
}
document
  .getElementById("searchInput")
  .addEventListener("input", async function () {
    weatherStatus = await getWeather(this.value);
    if (weatherStatus != "") {
      displayCards(weatherStatus);
    }
  });

document
  .querySelector(".image-input button")
  .addEventListener("click", async function () {
    weatherStatus = await getWeather(
      document.getElementById("searchInput").value
    );
    if (weatherStatus != "") {
      displayCards(weatherStatus);
    }
  });
function displayCards(obj) {
  date = new Date(`${obj.current.last_updated}`);
  Cards = ` <div class="cards row g-0">
    <div class="col-md-4 col-sm-10 mx-sm-auto py-sm-3 ">
      <div class="card text-white">
        <div class="card-header d-flex justify-content-between">
          <h5>${days[date.getDay()]}</h5>
          <h5>${date.getDate()} ${months[date.getMonth()]}</h5>
        </div>
        <div class="card-body p-3">
          <h5 class="card-title py-3">${obj.location.name}</h5>
          <div
            class="d-flex justify-content-around degree align-items-center"
          >
            <div class="num">${obj.current.temp_c}<sup>o</sup>C</div>
            <div class="icon-imge">
              <img src="https:${
                obj.current.condition.icon
              }" alt="cloud" class="w-100" />
            </div>
          </div>
          <p>${obj.current.condition.text}</p>
          <div class="icons d-flex">
            <div class="me-4">
              <i class="fa-solid fa-umbrella"></i>
              <span>${obj.current.cloud}%</span>
            </div>
            <div class="me-4">
              <i class="fa-solid fa-wind"></i>
              <span>${obj.current.wind_kph}Km/h</span>
            </div>
            <div class="me-4">
              <i class="fa-regular fa-compass"></i>
              <span>${directionMapping[obj.current.wind_dir]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4 col-sm-10  mx-sm-auto py-sm-3">
      <div class="card text-white ">
        <div class="card-header d-flex justify-content-center">
          <h5>${days[date.getDay() + 1]}</h5>
        </div>
        <div class="card-body px-3 text-center  ">
          <div class="degree ">
            <div class="icon-imge my-3">
              <img src="https:${
                obj.forecast.forecastday[1].day.condition.icon
              }" alt="cloud" />
            </div>
            <div class="number my-3">
            <div class="num1">${
              obj.forecast.forecastday[1].day.maxtemp_c
            }<sup>o</sup>C</div>
            <div class="num2">${
              obj.forecast.forecastday[1].day.mintemp_c
            }<sup>o</sup></div>
          </div>
          </div>
          <p class="my-3">${obj.forecast.forecastday[1].day.condition.text}</p>
        </div>
      </div>
    </div>
    <div class="col-md-4 col-sm-10 py-sm-3 mx-sm-auto ">
      <div class="card text-white ">
        <div class="card-header d-flex justify-content-center">
          <h5>${days[date.getDay() + 2]}</h5>
        </div>
        <div class="card-body px-3 text-center  ">
          <div class="degree ">
            <div class="icon-imge my-3">
              <img src="https:${
                obj.forecast.forecastday[2].day.condition.icon
              }" />
            </div>
            <div class="number my-3">
            <div class="num1">${
              obj.forecast.forecastday[2].day.maxtemp_c
            }<sup>o</sup>C</div>
            <div class="num2">${
              obj.forecast.forecastday[2].day.mintemp_c
            }<sup>o</sup></div>
          </div>
          </div>
          <p class="my-3">${obj.forecast.forecastday[2].day.condition.text}</p>
        </div>
      </div>
    </div>
    
  </div>  `;
  containerCard.innerHTML = Cards;
}
navigator.geolocation.getCurrentPosition(async function (position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let com = `${latitude},${longitude}`;
  let obj = await getWeather(com);
  displayCards(obj);
});
