const latEl = document.getElementById('lat');
const longEl = document.getElementById('lon');
const tableEl = document.getElementById('allData');
const mapBox = document.getElementById('mapBox');


let latitude;
let longitude;
const apiKey = `08d38c5694fd7a8b0417ae5b6c7edacf`;

const z = function () {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    // Displaying lat and long in  section 1
    latEl.textContent = latitude;
    longEl.textContent = longitude;
    console.log('latitude: ', latitude, 'longitude: ', longitude);

    // display location on map
    displayMap(latitude, longitude);
    function displayMap(latitude, longitude) {
      const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', mapUrl);
      iframe.setAttribute('width', '100%');
      iframe.setAttribute('height', '100%');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('style', 'border:0');
      mapBox.appendChild(iframe);
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
      .then((r) => r.json())
      .then((data) => {
        // following data should be added to the table as elements
        const html = `
        <tr>
        <td><b>Location:</b>  ${data.name}</td>
        </tr>
        <tr>
        <td><b>Lat:</b>  ${latitude}</td>
        <td><b>Long:</b>  ${longitude}</td>
        </tr>
        <tr>
        <td><b>Timezone:</b>  ${data.timezone}</td>
        </tr>
        <tr>
        <td><b>Wind Speed:</b>  ${data.wind.speed}</td>
        </tr>
        <tr>
        <td><b>Humidity:</b>  ${data.main.humidity}</td>
        </tr>
        <tr>
        <td><b>Wind Direction(in deg):</b>  ${data.wind.deg}</td>
        </tr>
        <tr>
        <td><b>Pressure:</b>  ${data.main.pressure}</td>
        </tr>
        <tr>
        <td><b>Feels Like:</b>${data.main.feels_like}</td>
        </tr>
        `
        tableEl.innerHTML = html;
        console.log('open weather data: ', data)
      }).catch((err) => alert(err.message))
  }, () => {
    alert('Sorry could not locate your current Location 😒😒😒')
  })
}

z();