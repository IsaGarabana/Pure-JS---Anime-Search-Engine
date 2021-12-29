"use strict";

/////////////////////////  VARIABLES GLOBALES /////////////////////////
const searchResult = document.querySelector(".js-searchResult");
const apiUrl = "https://api.jikan.moe/v3/search/anime?q=";
const searchInput = document.querySelector(".js-input");
const searchBtn = document.querySelector(".js-searchBtn");

///Array de datos del fetch///
let data = [];
let dataFavorites = [];

///////////////////////// FUNCIONES /////////////////////////

////Función que pinta UN elemento del Array////
function renderAnime(dataAnime) {
	console.log(dataAnime);
	searchResult.innerHTML += `<li class="js_addToFav">
			<img
				src="${dataAnime.image_url}"
				class=""
			></img>
			<p class="">${dataAnime.title}</p>
		</li>`;
}

////Función que recorre el array pintando TODOS sus elementos////
function renderAnimeList() {
	for (const eachAnime of data) {
		renderAnime(eachAnime);
	}

	const animesListForFavs = document.querySelectorAll(".js_addToFav");
	console.log(animesListForFavs);
	for (const eachAnimeForFavs of animesListForFavs) {
		eachAnimeForFavs.addEventListener("click", handleAddtoFavs);
	}
}

//// Función Manejadora del botón Search////
function handleSearchButton(ev) {
	ev.preventDefault();
	const inputValue = searchInput.value;

	//api sólo acepta búsquedas de 3 caracteres o más
	if (inputValue.length > 2) {
		fetch(`${apiUrl}${inputValue}+ &limit=3`)
			.then((response) => response.json())
			.then((dataApi) => {
				data = dataApi.results;
				renderAnimeList();
			});
	} else {
		alert("Please type at least 3 characters to start searching");
	}
}

////Función que añade elementos a la lista de favoritos///
function handleAddtoFavs(event) {
	console.log(event.currentTarget);
}

////Función que pinta los favoritos////

////////// LISTENERS//////////

searchBtn.addEventListener("click", handleSearchButton);
