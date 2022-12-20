const apiKey = "abde79acd6e200e999760d513a430054"

window.addEventListener('load', () => {
  
    
    if (!navigator.geolocation) {
      console.error("Browser no supported")
      return
     }
    navigator.geolocation.getCurrentPosition(onSuccess, onFailure) 

  });

  const onSuccess = async (position) => {

    const{longitude, latitude} = position.coords
    
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(baseURL)

        if (response.status !== 200) {
            throw new Error("Bad request")
        }
        
        const data = await response.json()
        renderData(data)

       } catch (error) {
        console.error(error)
    }
    }
  
  const onFailure = (error) => {
    console.error(error)
  }

  const renderData = (data) => {

    const {
        name: place, 
        main: {temp}, 
        weather: [{description, icon}], 
        sys: {sunrise, sunset}
    } = data

    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const fahrenheit = (temp * 9) / 5 + 32;

    // Converting Epoch(Unix) time to GMT
    const sunriseGMT = new Date(sunrise * 1000);
    const sunsetGMT = new Date(sunset * 1000);

    const iconImg = document.getElementById('weather-icon');
    const loc = document.querySelector('#location');
    const tempC = document.querySelector('.c');
    const tempF = document.querySelector('.f');
    const desc = document.querySelector('.desc');
    const sunriseDOM = document.querySelector('.sunrise');
    const sunsetDOM = document.querySelector('.sunset');

    iconImg.src = iconUrl;
    loc.textContent = `${place}`;
    desc.textContent = `${description}`;
    tempC.textContent = `${temp.toFixed(2)} °C`;
    tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
    sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
    sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
  }
