require('dotenv').config();
const {
    showMainMenu,
    pause,
    readInput,
    showPlacesMenuList,
    confirm,
} = require('./helpers/ui_menu');
const Searchings = require('./models/searchings');

const main = async () => {
    const searchings = new Searchings();
    let opt = -1;
    do {
        opt = await showMainMenu();
        switch (opt) {
            case 1:
                const placeSearch = await readInput('Ingress a place for Search');
                const places = await searchings.places(placeSearch);
                const idPlace = await showPlacesMenuList(places);
                if (idPlace === '0') continue;
                const place = places.find(place => place.id === idPlace);
                searchings.addPlaceToHistory(place.name);
                const weatherInfo = await searchings.weather(place.lat, place.lon)

                console.log(`==== RESULT SEARCH ====`);
                console.log(`Place Name: ${place.name}`);
                console.log(`Lat: ${place.lat}`);
                console.log(`Lon: ${place.lon}`);
                console.log(`Temp: ${weatherInfo.temp}`);
                console.log(`Min Temp: ${weatherInfo.temp_min}`);
                console.log(`Max Temp: ${weatherInfo.temp_max}`);
                break;
            case 2:
                searchings.historyCapitalized.forEach((item, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${item} `);
                });
                break;
        }


        if (opt !== 0) await pause();
    } while (opt !== 0);
    console.log('Good Bye ......');
}
main();