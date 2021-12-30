/* eslint-disable no-undef */
/* eslint-disable indent */
"use strict";

///FALTA AÑADIR IMAGEN DE RELLENO
/// PUEDO SACAR FUERA DE LA FUNCIÓN EL CAMBIO DE CLASE HIGHLIGHT?

///////////////////////// FUNCIONES /////////////////////////

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

	const animesListForFavs = document.querySelectorAll(".js_addToFav"); //Justo después del bucle que recorre y pinta los elementoss del array, una vez pintados, los seleccionamos todos y ponemos el listener (abajo) para añadir después con currentarget el seleccionado a la lista de favoritos
	console.log(animesListForFavs);
	for (const eachAnimeForFavs of animesListForFavs) {
		eachAnimeForFavs.addEventListener("click", handleAddToFavs);
	}
}

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
////Función que añade elementos a la lista de favoritos////
function handleAddToFavs(event) {
	event.currentTarget.classList.toggle("highlight");

	const selectedAnimeTitle = event.currentTarget.dataset.title; //metemos en una constante el elemento al que hacems click; poniéndole un 'gancho' con el dataset (data-title="${eachAnime.title})

	const selectedAnimeData = data.find((row) => row.title === selectedAnimeTitle); //con el método find metemos en una constante todo el objeto que pillamos con el gancho. Coge el objeto en el array data que hemos pulsado, lo identifica con el dataset.title.
	console.log(selectedAnimeData);

	//Buscamos si en el array de favoritos está el que hemos clicado
	const favsData = dataFavorites.find((row) => row.title === selectedAnimeTitle);

	if (favsData === undefined) {
		//la serie no está en el listado de favoritos. la añadimos
		dataFavorites.push(selectedAnimeData);
	} else {
		//Sí hay series en el listado. filtramos para quedarnos con todas menos con la que clicamos
		dataFavorites = dataFavorites.filter((row) => row.title !== selectedAnimeTitle);
	}

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
			</li>
			<button class="favBtn js-favBtn" data-title="${eachFav.title}" title="delete favorite"> x</button>`;
}
////Función que resalta los favoritos////
///Toggle con el evento...pero no me lo
///Función que resetea los resultados de búsqueda y el input///
function handleResetInput(ev) {
	ev.preventDefault();
	searchInput.value = "";
	searchResult.innerHTML = "";
}

////////// LOCAL STORAGE //////////

////////// LISTENERS//////////

searchBtn.addEventListener("click", handleSearchButton);
resetInputBtn.addEventListener("click", handleResetInput);
