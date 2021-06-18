//Function to randomly choose an element from an array:
export const choice = (array) => {
    var randomIndex = Math.floor(Math.random() * array.length);
    var randomElement = array[randomIndex];
    return randomElement;
}
