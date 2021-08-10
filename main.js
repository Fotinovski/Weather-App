let weather = {
  apiKey: "72198991b161114d2bc8dafb8e205188",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, pressure, feels_like, temp_min, temp_max } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;

    //Dinamichen naslov i favicon
    document.querySelector(".web-title").innerText =
      name + " - " + country + " | " + temp.toFixed(1) + "°C";
    document.querySelector(".favicon").href =
      "https://openweathermap.org/img/wn/" + icon + ".png";

    //***Glaven kontent***
    //Lokacija
    document.querySelector(".city").innerText = name;
    document.querySelector(".country").innerText = country;

    // Temperaturi
    document.querySelector(".temp").innerText = temp.toFixed(1) + " °C";
    document.querySelector(".feels_like").innerText =
      "Feels like: " + feels_like.toFixed(1) + " °C";
    document.querySelector(".min_temp").innerText = temp_min.toFixed(1) + " °C";
    document.querySelector(".max_temp").innerText = temp_max.toFixed(1) + " °C";

    //Opis i slika
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;

    //Dopolnitelni informacii
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
      document.querySelector(".pressure").innerText =
      "Pressure: " + pressure + " hPa";
      
    //load
    document.querySelector(".weather").classList.remove("loading");
    //background slika
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};


// Search on click/keyup
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

// Default lokacija
weather.fetchWeather("Skopje");

//Deneshen datum
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();
today = dd + " / " + mm  + " / " + yyyy;

document.querySelector(".date").innerHTML = today;
