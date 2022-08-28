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

  getforecast(response.data.coord);
}
function getforecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "2c76d8a751b74e7c383770af76420b02";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forcastElement = document.querySelector("#forecast");

  forcastHTML = `<div class="row">`;
  let days = response.data.daily;
  document.querySelector("#tomorrowDegree").innerHTML = `${Math.round(
    days[0].temp.max
  )}℃`;
  document.querySelector("#minDegree").innerHTML = `${Math.round(
    days[0].temp.min
  )}℃`;

  document.querySelector("#tomorrowIcon").innerHTML = `<img src=
    "http://openweathermap.org/img/wn/${days[0].weather[0].icon}@2x.png"
    alt="${days[0].weather[0].description}"
    width="55"
    />`;

  days.forEach(function (getDays, index) {
    if (index < 5) {
      forcastHTML =
        forcastHTML +
        `<div class="col day p-3">
      <div class="icon">
      <img src=
    "http://openweathermap.org/img/wn/${getDays.weather[0].icon}@2x.png"
    alt="${getDays.weather[0].description}"
    width="40"
    />
      </div>
      <span class="degree-high"><strong>${Math.round(
        getDays.temp.max
      )}℃</strong> </span class="low">/<span>${Math.round(
          getDays.temp.min
        )}℃</span>
      <div class="day">${forecastDay(getDays.dt)}</div>
    </div>
    `;
    }
  });
  forcastHTML = forcastHTML + `</div>`;

  forcastElement.innerHTML = forcastHTML;
}

function forecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
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
