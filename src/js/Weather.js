export class WeatherView {
    constructor() {
        this.city = document.querySelector('.city');
        this.errorMessage = document.querySelector('.weather-error');
        this.icon = document.querySelector('.weather-icon');
        this.temperature = document.querySelector('.temperature');
        this.description = document.querySelector('.weather-description');
        this.wind = document.querySelector('.wind');
        this.humidity = document.querySelector('.humidity');
        this.choiseLanguage = {
            en: {
                city: 'Minsk',
                wind: 'Wind speed',
                humidity: 'Humidity'
            },
            be: {
                city: 'Мінск',
                wind: 'Хуткасць ветру',
                humidity: 'Вільготнасць'
            }
        }
    }

    async getWeather(lang) {
        let url;
        if(!this.city.value || this.city.value === 'Мінск' || this.city.value === 'Minsk') {
            url = `https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=${lang}&appid=2551f54b746e5a729d3206797e9adfdb&units=metric`;
            this.city.value = this.choiseLanguage[lang].city;
        }  else {
            url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city.value}&lang=${lang}&appid=2551f54b746e5a729d3206797e9adfdb&units=metric`;
        }
        try {
            const res = await fetch(url);
            const data = await res.json();
            
            this.errorMessage.textContent = '';
            this.icon.className = 'weather-icon owf';
            this.icon.classList.add(`owf-${data.weather[0].id}`);
            this.temperature.textContent = `${Math.trunc(data.main.temp)}°C`;
            this.description.textContent = data.weather[0].description;
            this.wind.textContent = `${this.choiseLanguage[lang].wind}: ${Math.trunc(data.wind.speed)} m/s`;
            this.humidity.textContent = `${this.choiseLanguage[lang].humidity}: ${Math.trunc(data.main.humidity)}%`;
        } catch(err) {
            this.errorMessage.textContent = 'Error';
            this.temperature.textContent = '';
            this.description.textContent = '';
            this.wind.textContent = '';
            this.humidity.textContent = '';
        }
      }

    setCityToLocalStorage = () => {
        localStorage.setItem('city', this.city.value);
    }
    
    getCityFromLocalStorage = () => {
        if(localStorage.getItem('city')) {
            this.city.value = localStorage.getItem('city');
        }
    }
    
    addCityChangeHandler = (lang) => {
        this.city.addEventListener('change', () => {
            this.getWeather(lang);
        });
    }

    addWindowUnloadWeatherHandler = () => {
        window.addEventListener('beforeunload', this.setCityToLocalStorage);
    }
}