/*jshint esversion: 8 */
let lat;
let long;
let locationTimezone = document.querySelector(".location-timezone");
let temperatureDegree = document.querySelector(".temperature-degree");
let temperatureDescription = document.querySelector(".temperature-description");
const proxy = "https://cors-anywhere.herokuapp.com/";

function fetchApi (lat, long) {
    const api = `${proxy}https://api.darksky.net/forecast/909ce527143a4fcd0ec92b13fef73ab6/${lat},${long}`;

    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const {summary, temperature, icon} = data.currently;

            //Set DOM Elements from the API
            const degreeC = (temperature - 32) * (5/9);
            temperatureDegree.textContent = degreeC.toFixed(1);
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

            // set Icon
            setIcons(icon, document.querySelector(".icon"));
        });
}

function setIcons(icon, iconID) { 
    const skycons = new Skycons({ color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}

window.addEventListener("load", () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            fetchApi (lat, long);
        });

        long = -3.7037902;
        lat = 40.4167754;

        fetchApi (lat, long);

    } 

});