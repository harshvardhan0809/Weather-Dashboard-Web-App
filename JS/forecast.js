const apiKey = "baa30fa1b6a77a6d05d4b0e3c209e07a";
const forecastDiv = document.getElementById("forecast")

const params = new URLSearchParams(window.location.search);
const city = params.get("city");

const toggleTheme = document.getElementById("themeToggle")
toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("light")
})

getForecast(city);

async function getForecast(city) {
    forecastDiv.innerHTML = "Loading...";

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    showForecast(data.list);
}

function showForecast(list) {
    document.getElementById("cityTitle").innerText = `${city} Forecast`;
    forecastDiv.innerHTML = "";

    list.slice(0, 9).map(item => {
        const div = document.createElement("div");

        div.innerHTML = `
            <p>${new Date(item.dt_txt).toLocaleString()}</p>
            <p>${item.main.temp}°C</p>
        `;

        forecastDiv.appendChild(div);
    });
}