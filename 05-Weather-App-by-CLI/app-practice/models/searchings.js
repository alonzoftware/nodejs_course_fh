const axios = require('axios');

const {
    saveDB,
    readDB,
} = require('../helpers/db_manager');

class Searchings {
    history = []
    constructor() {

        const infoDB = readDB();
        if (infoDB) {
            this.history = infoDB.history;
        }
    }


    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'en'
        }
    }

    get historyCapitalized() {
        return this.history.map(placeStr => {
            let placeArray = placeStr.split(' ');
            placeArray = placeArray.map(p => p[0].toUpperCase() + p.substring(1));
            return placeArray.join(' ');
        });
    }

    async places(placeSearch = '') {
        try {
            // http request
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeSearch}.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lon: place.center[0],
                lat: place.center[1],
            }));

        } catch (error) {
            return [];
        }
    }

    async weather(lat = '', lon = '') {
        try {
            // http request
            const intance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon }
            });

            const resp = await intance.get();
            const { weather, main } = resp.data;

            return {
                descrip: weather[0].description,
                temp: main.temp,
                temp_min: main.temp_min,
                temp_max: main.temp_max,
            }
            // console.log(resp.data);

        } catch (error) {
            return {};
        }
    }

    addPlaceToHistory(placeStr = '') {
        if (this.history.includes(placeStr.toLowerCase())) return;
        this.history.unshift(placeStr.toLowerCase());
        this.history = this.history.slice(0, 5);
        const payload = {
            history: this.history
        };
        saveDB(payload);
    }
}
module.exports = Searchings;