"use strict";

////////// VARIABLES GLOBALES //////////
const searchResult = document.querySelector(".js-searchResult");
const apiUrl = "https://api.jikan.moe/v3/search/anime?q=";
const searchInput = document.querySelector(".js-input");
const searchBtn = document.querySelector(".js-searchBtn");

///Array de datos del fetch///
let data = [];

////////// FUNCIONES //////////
function handleSearchButton(ev) {
	ev.preventDefault();
	const inputValue = searchInput.value;

	//api only accepts input of >=3 characters
	if (inputValue.length > 2) {
		fetch(`${apiUrl}${inputValue}`)
			.then((response) => response.json())
			.then((dataApi) => {
				data = dataApi.results;
				renderAnimeList();
			});
	} else {
		console.log("Search parameter must contain at least 3 characters");
	}
}

function renderAnime(dataAnime) {
	console.log(dataAnime);

	searchResult.innerHTML += `<li class="">
			<img
				src="${dataAnime.image_url}"
				class=""
			></img>
			<p class="">${dataAnime.title}</p>
		</li>`;
}

function renderAnimeList() {
	for (const eachAnime of data) {
		renderAnime(eachAnime);
	}
}

////////// LISTENERS//////////

searchBtn.addEventListener("click", handleSearchButton);

////PRIMER ATTEMPT DE PROGRAMACIÓN/////
// ////////// VARIABLES GLOBALES //////////

// const animeInput = document.querySelector(".js-input");
// const searchBtn = document.querySelector(".js-searchBtn");
// const apiUrl = "https://api.jikan.moe/v3/search/anime?q=";
// const searchResult = document.querySelector(".js-searchResult");

// let animeArray = {};

// ////////// FUNCIÓN QUE RECOGE LOS RESULTADOS DEL API //////////

// function handleSearchButton(ev) {
// ev.preventDefault();
// const inputValue = animeInput.value;
//if (animeInput.value.lenght => 3) {
// fetch(`${apiUrl}${inputValue}&limit=3`)
// .then((response) => response.json())
// .then((data) => {
// const animeData = data.results;
// console.log(animeData);
// for (const eachAnime of animeData) {
// const animeTitle = eachAnime.title;
// const animeImage = eachAnime.image_url;
// animeArray = { animeTitle, animeImage };
// console.log(animeArray);
// }
// })
// };

// //pintamos los resultados en nuestro listado
// }

// ////////// LISTENERS//////////

// /* Listener de búsqueda */ searchBtn.addEventListener(
// "click",
// handleSearchButton
// );
// /* Listener para añadir favoritos */
// /* Listener de reset */
