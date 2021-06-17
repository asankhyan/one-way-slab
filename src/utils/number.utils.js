export const roundOfDecimal = (input, places=2) => {
    if(input){
        return input.toFixed(places);
    }
    return input;
}