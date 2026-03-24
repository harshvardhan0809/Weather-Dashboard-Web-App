const apiKey = "baa30fa1b6a77a6d05d4b0e3c209e07a";
const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");
const Output = document.getElementById("output")

searchBtn.addEventListener("click", getWeather)

function displayWeather(data) {
    Output.innerHTML = `<h2>${data.name}</h2>
                        <p>Temperature: ${data.main.temp}</p>
                        <p>Condition: ${data.weather[0].description}`
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
    displayWeather(data)
}