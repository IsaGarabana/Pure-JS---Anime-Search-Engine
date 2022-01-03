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
	console.log(inputValue);
	//la api sólo acepta búsquedas de 3 caracteres o más
	if (inputValue.length > 2) {
		fetch(`${apiUrl}${inputValue}`)
			.then((response) => response.json())
			/// Metemos el resultado de la búsqueda en nuestro array vacío de resultados
			.then((dataApi) => {
				data = dataApi.results;

				if (data.length === 0) {
					searchResult.innerHTML = "sorry your search did not match any results";
				} else {
					//Llamamos a la función que pinta resultados
					renderAnimeList();
				}
			});
	} else {
		// eslint-disable-next-line quotes
		searchResult.innerHTML = "Please type at least 3 characters to start searching";
	}
}

////Función que pinta UN elemento del Array////
function renderAnime(eachAnime) {
	let favClass = "";
	const alreadyInFavs = dataFavorites.find(
		(favAnime) => favAnime.title === eachAnime.title
	);

	if (alreadyInFavs !== undefined) {
		favClass = "highlight";
	} else {
		favClass = "";
	}

	searchResult.innerHTML += `<li  class="js_addToFav ${favClass}" data-title="${eachAnime.title}" >
	<img src="${eachAnime.image_url}" data-title="${eachAnime.title}></img>
	<p class="">${eachAnime.title}</p>
		</li>`;
}

////Función que recorre el array pintando TODOS sus elementos////
function renderAnimeList() {
	//hacemos un bucle para recorrer todo el array data, y pedimos que en cada vuelta haga un render de cada elemento con la función qur tenemos definida: renderAnime(eachAnime)
	searchResult.innerHTML = "";

	for (const eachAnime of data) {
		renderAnime(eachAnime);
	}

	//Después del bucle que recorre y pinta los elementos del array, una vez pintados, los seleccionamos todos y ponemos el listener (abajo) para añadir después con currentarget el seleccionado a la lista de favoritos.
	const animesListForFavs = document.querySelectorAll(".js_addToFav");
	for (const eachAnimeForFavs of animesListForFavs) {
		eachAnimeForFavs.addEventListener("click", handleAddToFavs);
	}
}

//// Listener////

searchBtn.addEventListener("click", handleSearchButton);
