const container = document.querySelector('.container');

const toggleModeBtn = document.getElementById('toggleMode');
const body = document.body;
const APIKey = '5c7a95fa6e3ec618a37a2f508957c4bb';

function getWeatherForecast() {
    const city = document.getElementById('city').value;

    if (!city){
        //error message if search box empty
        alert('Please enter a city');
        return;
    }

    //API openweathermap - current weather and hourly forecast
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&
    units=metric&appid=${APIKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&units
    =metric&appid=${APIKey}`;

    // Current Weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => 
            { displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching current weather data:', error);
                alert('Error fetching current weather data. Please try again.');
            });
    
    // Hourly weather
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => 
            { displayHourlyForecast(data.list);
            })
            .catch(error => {
                console.error('Error fetching current weather data:', error);
                alert('Error fetching current weather data. Please try again.');
            });
}

//display current weather
function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    //Clearing previous content after user input
    weatherInfoDiv.innerHTML = "";
    hourlyForecastDiv.innerHTML = "";
    tempDivInfo.innerHTML = "";

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`
    } else {
        const cityName = data.name;
        const temperature = parseInt(data.main.temp);
        const description = data.weather[0].description.toUpperCase();
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `
            <p>${cityName}</p>
            <p>${description}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl
        weatherIcon.alt = description;

        showImage();

    }
}

//display hourly forecast
function displayHourlyForecast(hourlyData) {

    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 24);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = parseInt(item.main.temp);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`

        //creates a string = string for each hourlyItemHtml icon
        const hourlyItemHtml = `
        <div class = "hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
        </div>`;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;

    });
}

//displaying the weather icon
function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}

// Geolocation functions
function getWeatherByGeolocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            getWeatherByCoordinates(latitude, longitude);
        }, (error) => { 
            console.error("Error getting geolocation:", error); //error message if location is not found
            alert("Error getting your location. Please try again or enter your city manually.");
        });
    } else {
        console.error("Geolocation is not supported by your browser");
        alert("Geolocation is not supported by your browser. Please enter your city manually.");
    }
}

function getWeatherByCoordinates(latitude, longitude) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${APIKey}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
    
}
getWeatherByGeolocation();

// Event listener for click in the search input
document.querySelector('.search-box input').addEventListener('click', (event) => {
    search.click();
});

// Event listener for Enter key press in the search input

document.querySelector('.search-box input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getWeatherForecast();
    }
});

// event listener for light and dark mode
document.addEventListener('DOMContentLoaded', () => {
    const toggleMode = document.getElementById('toggleMode');

    toggleMode.addEventListener('change', () => {
        if (toggleMode.checked) {
            container.classList.add('dark-mode');
        } else {
            container.classList.remove('dark-mode');
        }
    });
});