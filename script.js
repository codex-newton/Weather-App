document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'ea01fc19f95cfad86e3e77272f6d02f1';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const locationInput = document.getElementById('locationInput');
    const latInput = document.getElementById('latInput');
    const lonInput = document.getElementById('lonInput');
    const searchButton = document.getElementById('searchButton');
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const errorMessageElement = document.getElementById('error-message');
    const cityInputs = document.getElementById('cityInputs');
    const coordinateInputs = document.getElementById('coordinateInputs');

    document.querySelectorAll('input[name="searchMethod"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            if (event.target.value === 'city') {
                cityInputs.style.display = 'block';
                coordinateInputs.style.display = 'none';
            } else {
                cityInputs.style.display = 'none';
                coordinateInputs.style.display = 'block';
            }
        });
    });

    searchButton.addEventListener('click', () => {
        const searchMethod = document.querySelector('input[name="searchMethod"]:checked').value;
        if (searchMethod === 'city') {
            const location = locationInput.value.trim();
            if (location) {
                fetchWeatherByCity(location);
            } else {
                errorMessageElement.textContent = 'Please enter a city name';
                clearWeatherInfo();
            }
        } else if (searchMethod === 'coordinates') {
            const lat = latInput.value.trim();
            const lon = lonInput.value.trim();
            if (lat && lon) {
                fetchWeatherByCoordinates(lat, lon);
            } else {
                errorMessageElement.textContent = 'Please enter both latitude and longitude';
                clearWeatherInfo();
            }
        }
    });

    function fetchWeatherByCity(location) {
        const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.cod === 200) {
                    locationElement.textContent = data.name;
                    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
                    descriptionElement.textContent = data.weather[0].description;
                    errorMessageElement.textContent = ''; // Clear any previous error messages
                } else {
                    throw new Error('Location not found');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                errorMessageElement.textContent = `Error: ${error.message}`;
                clearWeatherInfo();
            });
    }

    function fetchWeatherByCoordinates(lat, lon) {
        const url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.cod === 200) {
                    locationElement.textContent = data.name;
                    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
                    descriptionElement.textContent = data.weather[0].description;
                    errorMessageElement.textContent = ''; // Clear any previous error messages
                } else {
                    throw new Error('Location not found');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                errorMessageElement.textContent = `Error: ${error.message}`;
                clearWeatherInfo();
            });
    }

    function clearWeatherInfo() {
        locationElement.textContent = '';
        temperatureElement.textContent = '';
        descriptionElement.textContent = '';
    }
});
