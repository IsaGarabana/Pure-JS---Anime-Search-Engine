"use strict";

///FALTA AÑADIR IMAGEN DE RELLENO
/// FALTA SACAR A FUERA DE

/////////////////////////  VARIABLES GLOBALES /////////////////////////
const searchResult = document.querySelector(".js-searchResult");
const apiUrl = "https://api.jikan.moe/v3/search/anime?q=";
const searchInput = document.querySelector(".js-input");
const searchBtn = document.querySelector(".js-searchBtn");
const resetInputBtn = document.querySelector(".js-resetInput");
const favList = document.querySelector(".js-favList");
///Array de datos del fetch///
let data = [];

///Array de Favoritos///
let dataFavorites = [];

///////////////////////// FUNCIONES /////////////////////////

////Función que pinta UN elemento del Array////
function renderAnime(dataAnime) {
	console.log(dataAnime);

	searchResult.innerHTML += `<li  class="js_addToFav" data-title="${dataAnime.title}" >
	<img src="${dataAnime.image_url}" data-title="${dataAnime.title}></img>
	<p class="">${dataAnime.title}</p>
		</li>`;
}

////Función que recorre el array pintando TODOS sus elementos////
function renderAnimeList() {
	//hacemos un bucle para recorrer todo el array data, y pedimos que en cada vuelta haga un render de cada elemento con la función qur tenemos definida: renderAnime(eachAnime)
	for (const eachAnime of data) {
		renderAnime(eachAnime);
	}

	const animesListForFavs = document.querySelectorAll(".js_addToFav"); //Justo después del bucle que recorre y pinta los elementoss del array, una vez pintados, los seleccionamos todos y ponemos el listener (abajo) para añadir después con currentarget el seleccionado a la lista de favoritos
	console.log(animesListForFavs);
	for (const eachAnimeForFavs of animesListForFavs) {
		eachAnimeForFavs.addEventListener("click", handleAddToFavs);
	}
}

function getInputValue() {
	return searchInput.value;
}

//// Función que busca en el API al pulsar el botón Search////
function handleSearchButton(ev) {
	ev.preventDefault();
	let inputValue = getInputValue();
	//la api sólo acepta búsquedas de 3 caracteres o más
	if (inputValue.length > 2) {
		fetch(`${apiUrl}${inputValue}+ &limit=3`)
			.then((response) => response.json())
			/// Metemos el resultado de la búsqueda en nuestro array vacío de resultados
			.then((dataApi) => {
				data = dataApi.results;
				// y llamamos a la función que los pinta todos
				renderAnimeList();
			});
	} else {
		alert("Please type at least 3 characters to start searching");
	}
}

////Función que añade elementos a la lista de favoritos////
function handleAddToFavs(event) {
	event.currentTarget.classList.toggle("highlight");
	const selectedAnimeTitle = event.currentTarget.dataset.title; //metemos en una constante el elemento al que hacems click; poniéndole un 'gancho' con el dataset (data-title="${eachAnime.title})

	const selectedAnimeData = data.find((row) => row.title === selectedAnimeTitle); //con el metodo find metemos en una constante todo el objeto que pillamos con el gancho. Coge el objeto en el array data que hemos pulsado, lo identifica con el dataset.title.
	console.log(selectedAnimeData);

	dataFavorites.push(selectedAnimeData);
	renderAllFavs();
}

////Función que pinta todos los favoritos recorriendo el array de favoritos////
function renderAllFavs() {
	favList.innerHTML = ""; //'primero vaciamos, para que no nos pinte de nuevo los que ya tenemos en el array'
	for (const eachFav of dataFavorites) {
		renderFavsItem(eachFav);
	}
}

////Función que pinta UN favorito////
function renderFavsItem(eachFav) {
	favList.innerHTML += `<li  class="js_addToFav" data-title="${eachFav.title}" >
			<img src="${eachFav.image_url}"></img>
			<p class="">${eachFav.title}</p>
			</li>`;
}
////Función que resalta los favoritos////
///Toggle con el evento...pero no me lo
///Función que resetea los resultados de búsqueda y el input///
function handleResetInput(ev) {
	ev.preventDefault();
	searchInput.value = "";
	searchResult.innerHTML = "";
}
////////// LISTENERS//////////

searchBtn.addEventListener("click", handleSearchButton);
resetInputBtn.addEventListener("click", handleResetInput);
