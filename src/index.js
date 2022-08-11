let now = new Date();

let time = now.getHours();
if (time < 10) {
  time = `0${time}`;
}
let min = now.getMinutes();
if (min < 10) {
  min = `0${min}`;
}

let year = now.getFullYear();
let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let displayTime = document.querySelector("h1");
let displaydate = document.querySelector("#date");
displayTime.innerHTML = `${time}:${min}`;
displaydate.innerHTML = `${day}, ${month} ${year}`;

function getTemp(response) {
  let celsius = document.querySelector("#degree");
  celsius.innerHTML = Math.round(response.data.main.temp);
  let cityDescription = document.querySelector("#details");
  cityDescription.innerHTML = response.data.weather[0].description;
  document.querySelector("div.location").innerHTML = response.data.name;
}

function searchCity(city) {
  let apiKey = "c9c90c9d41381c966b92e97480461b42";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

function button(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}

function showPosition(postion) {
  let lat = postion.coords.latitude;
  let lon = postion.coords.longitude;
  let apiKey = "c9c90c9d41381c966b92e97480461b42";
  let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(currentApiUrl).then(getTemp);
}

function getCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", button);

let newButton = document.querySelector("button");
newButton.addEventListener("click", getCurrent);

searchCity("abuja");
