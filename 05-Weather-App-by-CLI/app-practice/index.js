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
                console.log(places);
                break;
        }

        if (opt !== 0) await pause();
    } while (opt !== 0);
    console.log('Good Bye ......');
}
main();