export function millisToMinutesAndSeconds(millis) {
    const minute = Math.floor(millis /(1000)/60);
    const seconds = Math.floor(((millis - (minute * 60000)) * 0.001));
    return `${minute}:${seconds<10?`0${seconds}`:seconds}`
}