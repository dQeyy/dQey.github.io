const weahterForm = document.querySelector(".weahterForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "ffc5de1642cf5a3e95345584a558d103";

weahterForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){

        try{
            
            const weahterData = await getWeatherData(city);
            displayWeahterInfo(weahterData);

        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please enter a city");
    }


});
async function getWeatherData(city){

    const apiUrl = `https://apiopenweahtermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");

    }

    return await response.json();

} 

function displayWeahterInfo(data){

    const {name: city, 
           main: {temp, humidity}, 
           weahter: [{description, id}]} = data;

    card.textContent = ""
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weahterEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}``°C`;
    humidityDisplay.textContent = `Humidty: ${humidity}%`;
    descDisplay.textContent = description;
    weahterEmoji.textContent = getWeahterEmoji(id);

    cityDisplay.classsList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weahterEmoji.classList.add("weahterEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weahterEmoji);

}

function getWeahterEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
          return "🌩️";

        case (weatherId >= 300 && weatherId < 400):
          return "🌧️";

        case (weatherId >= 500 && weatherId < 600):
          return "🌧️";

        case (weatherId >= 600 && weatherId < 700):
          return "🌨️";

        case (weatherId >= 700 && weatherId < 800):
          return "💨";

        case (weatherId === 800):
          return "☀️";

        case (weatherId >= 801 && weatherId < 810):
          return "☁️";

         default:
            return "❔";

    }

}
function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classsList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}

