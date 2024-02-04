const container = document.querySelector('.container');

const toggleModeBtn = document.getElementById('toggleMode');
const body = document.body;

function getWeather() {


    const APIKey = '5c7a95fa6e3ec618a37a2f508957c4bb';
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

//display the weather data based from the API
    // take weather data, extracts weather information, updates the HTML elements, 
    //displays error message if there is an issue with API request

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
        const temperature = parseInt(data.main.temp); // converts to Celsius
        const description = data.weather[0].description;
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


        //shows the weather icon visible
            // will occur 
        showImage();

    }
}

//display hourly forecast
    //takes the hourly weather
    //extracts the relevant information of 24 hours
    //creates element each hour
    //updated in the hourlyForecastDiv
function displayHourlyForecast(hourlyData) {

    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8); // displaying the hourly forecast in 3 hour intervals -> slice the 24 hour data, extracts the first 8 items 

    //iterate over each hourly data and create content to display 
        //using a forEach loop to iterate in the next25Hours array
            // for each item it extracts the time, temp in celsius, weather icon code 
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

        //append the created hourlyItemHtml to the hourlyForecastDiv
        hourlyForecastDiv.innerHTML += hourlyItemHtml;


    });
}

//displaying the weather icon
function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; //changing the css style for the weatherIcon div in html
}

// Event listener for click in the search input
document.querySelector('.search-box input').addEventListener('click', (event) => {
    search.click();
});

// Event listener for Enter key press in the search input

document.querySelector('.search-box input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getWeather();
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