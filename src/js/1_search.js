/* eslint-disable indent */
"use strict";

///////////////////////Función que coge el valor del input///////////////////////
function getInputValue() {
	return searchInput.value.toLowerCase();
}

/////////////////////// Función que busca en el API al pulsar el botón Search///////////////////////
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

				if (data.length === 0) {
					searchResult.innerHTML = "Ups!! No animes with that name. Try a different one!";
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

///////////////////////Función que pinta UN elemento del Array///////////////////////
function renderAnime(eachAnime) {
	//creamos una variable que luego interpolaremos en el <li> que pintemos
	let favClass = "";
	//buscamos en el array de favoritos si hay algún objeto cuyo título coincida con alguno de nuestro array d e resultados (eachAnime.title)
	const alreadyInFavs = dataFavorites.find(
		(favAnime) => favAnime.title === eachAnime.title
	);

	//si encuentra coincidencias, la clase será highlight. Si no, estará vacía y no se aplicará clase
	if (alreadyInFavs !== undefined) {
		favClass = "highlight";
	} else {
		favClass = "";
	}

	searchResult.innerHTML += `<li  class=" js_addToFav ${favClass}" data-title="${eachAnime.title}" >
	<img src="${eachAnime.image_url}" data-title="${eachAnime.title}></img>
	<p class="">${eachAnime.title}</p>
		</li>`;
}

////////////////////Función que recorre el array pintando TODOS sus elementos////////////////////
function renderAnimeList() {
	//hacemos un bucle para recorrer todo el array data, y pedimos que en cada vuelta haga un render de cada elemento con la función qur tenemos definida: renderAnime(eachAnime)
	searchResult.innerHTML = "";

	for (const eachAnime of data) {
		renderAnime(eachAnime);
	}

	//Después del bucle que recorre y pinta los elementos del arraylos seleccionamos todos y ponemos el listener para añadir con currentarget el seleccionado a la lista de favoritos.
	const animesListForFavs = document.querySelectorAll(".js_addToFav");
	for (const eachAnimeForFavs of animesListForFavs) {
		eachAnimeForFavs.addEventListener("click", handleAddToFavs);
	}
}

/////////////////////// Listener///////////////////////

searchBtn.addEventListener("click", handleSearchButton);
