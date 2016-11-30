export const setBackgroundColour = (direction) => {

    const colours = {
        "home": 'rgba(71,200,195, 0.3)',
        "away": 'rgba(85, 166, 216, 0.3)'
    };
    document.querySelector('body').style.backgroundColor = colours[direction];
};
