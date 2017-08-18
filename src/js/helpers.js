export const setBackgroundColour = (direction) => {

    const colours = {
        "home": 'rgba(34, 71, 142, 0.5)',
        "away": 'rgba(85, 166, 216, 0.3)'
    };
    document.querySelector('body').style.backgroundColor = colours[direction];
};

export function getDirection () {
    const hrs = new Date().getHours();
    if (hrs >= 5 && hrs <= 14) {
        return 'away';
    }
    if (hrs >= 15 && hrs <= 23) {
        return 'home';
    }
    if (hrs >= 0 && hrs <= 4) {
        return 'home';
    }
}
