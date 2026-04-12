const apiKey = "baa30fa1b6a77a6d05d4b0e3c209e07a";
const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const Output = document.getElementById("output")
let cities = [];
const popCities = ["Delhi", "Washington", "Sonipat", "New York", "Tokyo", "Paris", "Mumbai", "London"];
const sortOption = document.getElementById("sort")
const filterOption = document.getElementById("filter")

const toggleTheme = document.getElementById("lightDark")
toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("light")
})

sortOption.addEventListener("change", filterSortFunc)
filterOption.addEventListener("change", filterSortFunc)

searchBtn.addEventListener("click", () => getWeather());

function displayWeather(data) {
   Output.innerHTML = "";
    data.map(city => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a href="forecast.html?city=${city.name}">
            <h2>${city.name}</h2>
        </a>
        <p>Temperature: ${city.temp}°C</p>
        <p>Condition: ${city.condition}</p>
        <hr>`;
        Output.appendChild(div);
    });
};

async function getWeather (presentCities) {
    const city = presentCities || cityInput.value;
    if (city == "") {
        alert("Enter City Name");
        return;
    };
    if (!presentCities) {
        Output.innerHTML = "<p>Loading...</p>"
    };

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json()
    if (data.cod !== 200) {
        if (!presentCities) {
            Output.innerHTML = "<p>City Not Found!!!</p>"
        };
        return
    };
    const cityList = {
        name: data.name,
        temp: data.main.temp,
        condition: data.weather[0].description
    };
    if (!cities.some((c) => c.name == cityList.name)) {
        cities.push(cityList);
        displayWeather(cities);
    } else {
        alert("City Already Exist")
    };
}

window.onload = () =>{
    popCities.forEach(city => {
        getWeather(city)
    })
}

function filterSortFunc () {
    let result = [...cities]
    if (filterOption.value === "hot") {
        result = result.filter(t => t.temp > 30)
    }
    else if (filterOption.value === "cold") {
        result = result.filter(t => t.temp < 10)
    }

    if (sortOption.value === "temp") {
        result.sort((a, b) => a.temp - b.temp)
    } else if (sortOption.value === "name") {
        result.sort((a, b) => a.name.localeCompare(b.name))
    }
    displayWeather(result)
}