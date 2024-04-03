/** @format */

let imgCondition = document.getElementById('imgCondition');
let city = document.getElementById('city');
let haze = document.getElementById('haze');
let temp = document.getElementById('temp');
let pressure = document.getElementById('pressure');
let humidity = document.getElementById('humidity');
let search = document.getElementById('search');
let API = '9bcf311b051e4e9d863141943240304';
let base_url = `http://api.weatherapi.com/v1/current.json?key=${API}`;
let icon = `https://openweathermap.org/img/wn/`;
let defoultCity = 'riyadh,sa';

window.onload = function () {
	navigator.geolocation.getCurrentPosition(
		(place) => {
			getWeatherData(null, place.coords);
		},
		(e) => {
			getWeatherData();
		}
	);

	search.addEventListener('keypress', function (e) {
		if (e.key === 'Enter') {
			if (e.target.value !== '') {
				getWeatherData(e.target.value);
				e.target.value = '';
			} else {
				alert('Please Enter A Valid City Name');
			}
		}
	});
};

function getWeatherData(city = defoultCity, coords) {
	let url = base_url;
	city === null
		? (url = `${url}&q=${coords.latitude},${coords.longitude}`)
		: (url = `${url}&q=${city}`);

	axios
		.get(url)
		.then((res) => {
			console.log(res.data);
			let resObj = {
				icon: res.data.current.condition.icon,
				con: res.data.current.condition.text,
				haze: `${res.data.location.name}, ${res.data.location.country}`,
				temp: res.data.current.temp_c,
				presu: res.data.current.pressure_in,
				humi: res.data.current.humidity,
			};

			showData(resObj);
		})
		.catch((error) => console.log(error));
}

function showData(data) {
	imgCondition.src = data.icon;
	city.innerHTML = data.haze;
	haze.innerHTML = data.con;
	temp.innerHTML = data.temp;
	pressure.innerHTML = data.presu;
	humidity.innerHTML = data.humi;
}
