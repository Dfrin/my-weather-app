let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = currentTime.getDay();

let date = document.querySelector(".tday");
date.innerHTML = `Today, ${days[currentDay]} ${hours}:${minutes}`;

function weatherNow(response) {
  let city = document.querySelector(".myCity");
  city.innerHTML = response.data.name;
  let temparature = document.querySelector("#degreeI");
  temparature.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windy").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(".air").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "0a75bf8091478575bafa303e89932e4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(weatherNow);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  searchCity(city);
}
let form = document.querySelector("#search-input");
form.addEventListener("submit", search);

function showPosition(position) {
  let apiKey = "0a75bf8091478575bafa303e89932e4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(weatherNow);
}
navigator.geolocation.getCurrentPosition(showPosition);
function geoLoco(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#cityButton");
locationButton.addEventListener("click", geoLoco);
searchCity("New York");
