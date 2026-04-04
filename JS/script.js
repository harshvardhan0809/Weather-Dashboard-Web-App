const apiKey = "baa30fa1b6a77a6d05d4b0e3c209e07a";
const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const Output = document.getElementById("output")
let cities = []
searchBtn.addEventListener("click", getWeather)

function displayWeather(data) {
   Output.innerHTML = "";
    data.map(city => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a href="forecast.html?city=${city.name}">
            <h2>${city.name}</h2>
        </a>
        <p>Temperature: ${city.temp}</p>
        <p>Condition: ${city.condition}</p>
        <hr>`;
        Output.appendChild(div);
    })
}

async function getWeather () {
    const city = cityInput.value;
    if (city == "") {
        alert("Enter City Name");
        return;
    }
    
    Output.innerHTML = "<p>Loading...</p>"

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json()
    if (data.cod !== 200) {
        Output.innerHTML = "<p>City Not Found!!!</p>"
        return
    }
    const cityList = {
        name: data.name,
        temp: data.main.temp,
        condition: data.weather[0].description
    }
    cities.push(cityList);
    displayWeather(cities);
}