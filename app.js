window.addEventListener('load', () => {
    let longitude
    let latitude
    let apiKey = '33948b347292b7a94cb6139b74d8254a'
    let tempDesc = document.querySelector('.temperature-description')
    let tempDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let feelLike = document.querySelector('.temperature-feellike')
    let tempHumidity = document.querySelector('.temperature-humidity')

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position)
            longitude = position.coords.longitude
            latitude = position.coords.latitude

            //const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=en`

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const { temp, feels_like, humidity } = data.main
                    const icon = data.weather[0].icon
                    tempDegree.textContent = temp
                    tempDesc.textContent = data.weather[0].description
                    locationTimezone.textContent = data.sys.country
                    feelLike.textContent = feels_like
                    tempHumidity.textContent = humidity
                    setIcons(icon)
                })
        })
    }

    function setIcons(icon) {
        console.log(icon)
        let ikon = document.getElementById("icon")
        let att = document.createAttribute("src")
        att.value = `http://openweathermap.org/img/wn/${icon}@2x.png`
        ikon.setAttributeNode(att)
    }
})