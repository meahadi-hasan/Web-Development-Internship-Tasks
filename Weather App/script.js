// script.js
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'a2a58f23d54d1908371d9c298863af19'; // Replace with your OpenWeatherMap API key
    const locationInput = document.getElementById('location-input');
    const searchBtn = document.getElementById('search-btn');
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const conditionsElement = document.getElementById('conditions');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');

    function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    locationElement.textContent = `Location: ${data.name}, ${data.sys.country}`;
                    temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
                    conditionsElement.textContent = `Conditions: ${data.weather[0].description}`;
                    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
                    windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
                } else {
                    alert('City not found. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    function fetchWeatherByLocation(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                locationElement.textContent = `Location: ${data.name}, ${data.sys.country}`;
                temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
                conditionsElement.textContent = `Conditions: ${data.weather[0].description}`;
                humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
                windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    searchBtn.addEventListener('click', () => {
        const city = locationInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = locationInput.value.trim();
            if (city) {
                fetchWeather(city);
            }
        }
    });

    // Fetch weather based on user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByLocation(lat, lon);
        }, error => {
            console.error('Error getting location:', error);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});