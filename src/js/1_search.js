/* eslint-disable indent */
"use strict";

function getInputValue() {
	return searchInput.value.toLowerCase();
}

function handleSearchButton(ev) {
	ev.preventDefault();
	getResultsFromAPI();
}
function getResultsFromAPI() {
	let inputValue = getInputValue();

	if (inputValue.length > 2) {
		fetch(`${apiUrl}${inputValue}`)
			.then((response) => response.json())
			.then((dataApi) => {
				data = dataApi.results;

				if (data.length === 0) {
					searchResult.innerHTML = "Ups!! No animes with that name. Try a different one!";
				} else {
					renderAnimeList();
				}
			});
	} else {
		searchResult.innerHTML = "Please type at least 3 characters to start searching";
	}
}

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
	<p>${eachAnime.episodes}</p>
		</li>`;
}

function renderAnimeList() {

	searchResult.innerHTML = "";

	for (const eachAnime of data) {
		renderAnime(eachAnime);
	}

	const animesListForFavs = document.querySelectorAll(".js_addToFav");
	for (const eachAnimeForFavs of animesListForFavs) {
		eachAnimeForFavs.addEventListener("click", handleAddToFavs);
	}
}

//// Listener////

searchBtn.addEventListener("click", handleSearchButton);
