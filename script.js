const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temperature');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.weather-condition');
const nameOutput = document.querySelector('.cityname');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

// default city when the page loads
let cityInput = "Colombo";

// add click event to each city in the panel
cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    //change default city to the clicked city name 
    cityInput = e.target.innerHTML;
    // function that fetches and displays all the data from the weather API
    fetchWeatherData();
    //fade out the app (simple animation)
    app.style.opacity = '0';
  });
})

// add submit event to the form
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission
  // if the input field {search bar} is empty, show an alert 
  if (search.value.length == 0) {
    alert('Please enter a city name');
  } else {
    //change from default city to the one written in the input field 
    cityInput = search.value;
    // function that fetches and displays all the data from the weather API
    fetchWeatherData();
    //remove all text from the input field 
    search.value = "";
    //fade out the app (simple animation)
    app.style.opacity = "0";
  }
});

// function that returns a day of the week (sunday, monday, tuesday, etc.) from a date (20 05 2024)
function dayOfTheWeek(day, month, year) {
  const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekDay[new Date(`${year}-${month}-${day}`).getDay()];
}

// function that fetches and displays the data from the weather API
function fetchWeatherData() {
  fetch(`http://api.weatherapi.com/v1/current.json?key=your api key=${cityInput}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      temp.innerHTML = data.current.temp_c + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;

      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m}, ${y}`;
      timeOutput.innerHTML = time;

      nameOutput.innerHTML = data.location.name;

      const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);

      icon.src = "./icons/" + iconId;

      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      let timeOfDay = "day";

      const code = data.current.condition.code;

      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      if (code == 1000) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/Clear.jpg)`;
        btn.style.background = '#2c2c46';
        if (timeOfDay == "night") {
          btn.style.background = "#2e2e4d";
        }
      }
      else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/Cloudy.jpg)`;
        btn.style.background = '#2c2c46';
        if (timeOfDay == "night") {
          btn.style.background = "#1f1f32";
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1287 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/Rainy.jpg)`;
        btn.style.background = '#393e4d';
        if (timeOfDay == "night") {
          btn.style.background = "#4c3530";
        }
      } else {
        app.style.backgroundImage = `url(./images/${timeOfDay}/Snowy.jpg)`;
        btn.style.background = '#50576d';
        if (timeOfDay == "night") {
          btn.style.background = "#506d66";
        }
      }
      app.style.opacity = "1";
    })
    .catch(() => {
      alert('City not found, Please try again');
      app.style.opacity = "1";
    });
}

// Initial fetch of weather data for default city
fetchWeatherData();
