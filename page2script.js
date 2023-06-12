

function setIcon(index, weather)  {
	if (weather.includes("rain"))  {
		document.querySelector(`.ic${index}`).src = "images/icons/rain.png";
	}else{
		document.querySelector(`.ic${index}`).src = "images/icons/clouds.png";
	}
}

function setDay(time)  {
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	var d = new Date(time.slice(0,10));
	return days[d.getDay()];
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '76e2f3a6e5msha9d6055dd5051b9p1fee85jsn7d2265ba6bcb',
		'X-RapidAPI-Host': 'aerisweather1.p.rapidapi.com'
	}
};

let city = "Hyderabad";

function fetachWeather()  {
	let url = 'https://aerisweather1.p.rapidapi.com/forecasts/'+city+',in';

	fetch(url, options)
		.then(response => response.json())
		.then(response => {
			for (var i = 0; i < 7; i++)  {
				setIcon(i, response.response[0].periods[0].weather);
				document.querySelector(`.d${i}`).innerText = setDay(response.response[0].periods[i].dateTimeISO);
				document.querySelector(`.temp${i}`).innerText = response.response[0].periods[i].avgFeelslikeC + " °C";
				document.querySelector(`.pres${i}`).innerText = response.response[0].periods[i].pressureIN;
				document.querySelector(`.hum${i}`).innerText = response.response[0].periods[i].humidity;
				document.querySelector(`.wind${i}`).innerText = response.response[0].periods[i].windSpeedKPH + " Km/h";
			}
			console.log(response);
			
	})
	.catch(err => console.error(err));

}

function check()  {
	city = document.querySelector(".search-bar").value;
	const str = city;
	const str2 = str.charAt(0).toUpperCase() + str.slice(1);
	document.querySelector(".city").innerText = str2;
	fetachWeather();
	setbackground();
}


fetachWeather();


