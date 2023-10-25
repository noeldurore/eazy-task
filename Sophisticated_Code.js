/*
File Name: Sophisticated_Code.js
Content: Complex and Elaborate JavaScript Code
*/

// This code is a weather forecasting application that fetches weather data from an API and displays it on a webpage

// Declare global variables
let cityName = '';
let apiKey = 'your_api_key';
let weatherData = {};

// Fetch user input for the city name
function getUserInput() {
    cityName = prompt('Enter the city name: ');
}

// Fetch weather data from the API
async function fetchWeatherData() {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3`);
    const data = await response.json();
    
    weatherData = data;
}

// Display the weather data on the webpage
function displayWeatherData() {
    const weatherDetails = document.getElementById('weather-details');
    weatherDetails.innerHTML = '';

    const cityNameElement = document.createElement('h2');
    cityNameElement.textContent = weatherData.location.name;
    weatherDetails.appendChild(cityNameElement);

    const weatherConditionElement = document.createElement('p');
    weatherConditionElement.textContent = `Condition: ${weatherData.current.condition.text}`;
    weatherDetails.appendChild(weatherConditionElement);

    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temperature: ${weatherData.current.temp_c}°C`;
    weatherDetails.appendChild(temperatureElement);

    const humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${weatherData.current.humidity}%`;
    weatherDetails.appendChild(humidityElement);

    const windElement = document.createElement('p');
    windElement.textContent = `Wind: ${weatherData.current.wind_kph} km/h`;
    weatherDetails.appendChild(windElement);
}

// Initialize the application
function init() {
    getUserInput();
    fetchWeatherData().then(() => {
        displayWeatherData();
    });
}

// Entry point of the application
document.addEventListener('DOMContentLoaded', init);