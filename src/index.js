function formatTime(timestamp) {
  let now = new Date(timestamp);

  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${time}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hour}:${min}`;
}
function formatDate(timestamp) {
  let now = new Date(timestamp);
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
  return `${day}, ${month} ${year}`;
}
function getTemp(response) {
  let celsius = document.querySelector("#degree");
  let cityDescription = document.querySelector("#details");
  let displayTime = document.querySelector("h1");
  let displaydate = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  document.querySelector("div.location").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  celsius.innerHTML = Math.round(response.data.main.temp);
  cityDescription.innerHTML = response.data.weather[0].description;
  displayTime.innerHTML = formatTime(response.data.dt * 1000);
  displaydate.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

function linkFarhrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#degree");
  let farhTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farhTemp);
}

function linkCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#degree");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let farhrenheitLink = document.querySelector("#farhrenheit");
farhrenheitLink.addEventListener("click", linkFarhrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", linkCelsius);

let search = document.querySelector("#search-form");
search.addEventListener("submit", button);

let newButton = document.querySelector("button");
newButton.addEventListener("click", getCurrent);

searchCity("New York");
