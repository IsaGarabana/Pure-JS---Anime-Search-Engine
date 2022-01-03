/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
"use strict";

////Función que añade elementos a la lista de favoritos////

function handleAddToFavs(ev) {
	//metemos en una constante el elemento al que hacems click; poniéndole un 'gancho' con el dataset (data-title="${eachAnime.title})
	const selectedAnimeTitle = ev.currentTarget.dataset.title;

	//con el método find metemos en una constante todo el objeto que pillamos con el gancho. Coge el objeto en el array data que hemos pulsado, lo identifica con el dataset.title.
	const selectedAnimeData = data.find((row) => row.title === selectedAnimeTitle);

	//Buscamos si en el array de favoritos está el que hemos clicado
	const favsData = dataFavorites.find((row) => row.title === selectedAnimeTitle);

	if (favsData === undefined) {
		//la serie no está en el listado de favoritos. La añadimos.
		dataFavorites.push(selectedAnimeData);
	} else {
		//La serie sí está en el listado. Filtramos para quedarnos con todas menos con la que clicamos para que la elimine de favoritos.
		dataFavorites = dataFavorites.filter((row) => row.title !== selectedAnimeTitle);
	}

	//aprovechamos el evento para destacar con colores el anime seleccionado
	ev.currentTarget.classList.add("highlight");

	saveFavsInLS();
	renderAllFavs();
}

////Función que pinta todos los favoritos recorriendo el array de favoritos////
function renderAllFavs() {
	favList.innerHTML = ""; //'primero vaciamos el HTML, para que no nos pinte de nuevo los que ya tenemos en el array'
	for (const eachFav of dataFavorites) {
		renderFavsItem(eachFav);
	}

	//después del bucle de favoritos, añadimos el listener para escuchar a CADA botón y que borre el favorito seleccionado
	const eraseFavBtns = document.querySelectorAll(".js-favBtn");
	for (const eachFavBtn of eraseFavBtns) {
		eachFavBtn.addEventListener("click", handleDeleteFromFavs);
	}
}

////Función que pinta UN favorito////
function renderFavsItem(eachFav) {
	favList.innerHTML += `<li  class="js_addToFav " data-title="${eachFav.title}" >
			<img src="${eachFav.image_url}"></img>
			<p class="">${eachFav.title}</p>
			</li>
			<button class="favBtn js-favBtn" data-title="${eachFav.title}" title="delete favorite"> x</button>`;
}

//// Función que borra un favorito con su botón////
function handleDeleteFromFavs(ev) {
	const selectedFavButton = ev.currentTarget.dataset.title;

	//meto en una constante el favorito al que hace referencia el botón
	const selectedFavData = dataFavorites.find(
		(row) => row.title === selectedFavButton
	);

	//Busco el del objeto y lo eliminio del array con un filter que deja todos los objetos menos el que encuentra

	dataFavorites = dataFavorites.filter(
		(row) => row.title !== selectedFavData.title
	);

	renderAllFavs();
	saveFavsInLS();
}