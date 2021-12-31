/* eslint-disable indent */
"use strict";

////Función que coge el valor del input////
function getInputValue() {
	return searchInput.value.toLowerCase();
}

//// Función que busca en el API al pulsar el botón Search////
function handleSearchButton(ev) {
	ev.preventDefault();
	getResultsFromAPI();
}
function getResultsFromAPI() {
	let inputValue = getInputValue();
	//la api sólo acepta búsquedas de 3 caracteres o más
	if (inputValue.length > 2) {
		fetch(`${apiUrl}${inputValue}`)
			.then((response) => response.json())
			/// Metemos el resultado de la búsqueda en nuestro array vacío de resultados
			.then((dataApi) => {
				data = dataApi.results;
				// y llamamos a la función que los pinta todos
				renderAnimeList();
			});
	} else {
		// eslint-disable-next-line quotes
		alert("Please type at least 3 characters to start searching");
	}
}

////Función que pinta UN elemento del Array////
function renderAnime(dataAnime) {
	searchResult.innerHTML += `<li  class="js_addToFav" data-title="${dataAnime.title}" >
	<img src="${dataAnime.image_url}" data-title="${dataAnime.title}></img>
	<p class="">${dataAnime.title}</p>
		</li>`;
}

////Función que recorre el array pintando TODOS sus elementos////
function renderAnimeList() {
	//hacemos un bucle para recorrer todo el array data, y pedimos que en cada vuelta haga un render de cada elemento con la función qur tenemos definida: renderAnime(eachAnime)
	searchResult.innerHTML = "";
	for (const eachAnime of data) {
		renderAnime(eachAnime);
	}

	const animesListForFavs = document.querySelectorAll(".js_addToFav"); //Justo después del bucle que recorre y pinta los elementoss del array, una vez pintados, los seleccionamos todos y ponemos el listener (abajo) para añadir después con currentarget el seleccionado a la lista de favoritos.
	for (const eachAnimeForFavs of animesListForFavs) {
		eachAnimeForFavs.addEventListener("click", handleAddToFavs);
	}
}

//// Listener////

searchBtn.addEventListener("click", handleSearchButton);
