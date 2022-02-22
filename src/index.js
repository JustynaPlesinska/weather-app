let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];

let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
if (hours < 10) {
  hours = `0${hours}`;
}

let currentDay = document.querySelector(".current-day");
let currentHour = document.querySelector(".current-hour");

currentDay.innerHTML = `${day}`;
currentHour.innerHTML = `${hours}:${minutes}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let tempDescription = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let sunrise = new Date(response.data.sys.sunrise*1000);
  let sundown = new Date(response.data.sys.sunset*1000);
  let searchCity = document.querySelector("#city-name");
  searchCity.innerHTML = `${city}`;
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}ºC`;
  let describeWeather = document.querySelector("#weather-desc");
  describeWeather.innerHTML = tempDescription;
  let humid = document.querySelector("#humidity");
  humid.innerHTML = `${humidity}`;
  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = Math.round(`${wind}`*3.6);
  let iconElement = document.querySelector(".weather-icon");
  iconElement.setAttribute("src", `images/${response.data.weather[0].icon}.svg`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let sunriseTime = document.querySelector("#sunrise");
  let sunriseHour = sunrise.getHours();
  let sunriseMinute = sunrise.getMinutes();
  if  (sunriseMinute < 10) {
  sunriseMinute = `0${sunriseMinute}`;
  }
  if (sunriseHour < 10) {
  sunriseHour = `0${sunriseHour}`;
  }
  sunriseTime.innerHTML = `${sunriseHour}:${sunriseMinute} AM`;
  let sundownTime = document.querySelector("#sundown");
  let sundownHour = sundown.getHours();
  let sundownMinute = sundown.getMinutes();
  if  (sundownMinute < 10) {
  sundownMinute = `0${sundownMinute}`;
  }
  if (sundownHour < 10) {
  sundownHour = `0${sundownHour}`;
  }
  sundownTime.innerHTML = `${sundownHour}:${sundownMinute} PM`;
}

function firstPageCity(city) {
  let apiKey = "441b583c02706cbadc2a875695406721";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let city= document.querySelector("#city-input").value;
  firstPageCity(city);
}

function searchLocation(position) {
  let apiKey = "441b583c02706cbadc2a875695406721";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let formCity = document.querySelector("#city-search");
formCity.addEventListener("submit", searchCity);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLocation);

firstPageCity("London");