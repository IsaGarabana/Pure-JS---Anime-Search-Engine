/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
"use strict";


function handleAddToFavs(ev) {

	const selectedAnimeTitle = ev.currentTarget.dataset.title;

	
	const selectedAnimeData = data.find((row) => row.title === selectedAnimeTitle);
	const favsData = dataFavorites.find((row) => row.title === selectedAnimeTitle);

	if (favsData === undefined) {
	
		dataFavorites.push(selectedAnimeData);
	} else {
		dataFavorites = dataFavorites.filter((row) => row.title !== selectedAnimeTitle);
	}

	ev.currentTarget.classList.toggle("highlight");

	saveFavsInLS();
	renderAllFavs();
}

function renderAllFavs() {
	favList.innerHTML = ""; /
	for (const eachFav of dataFavorites) {
		renderFavsItem(eachFav);
	}


	const eraseFavBtns = document.querySelectorAll(".js-favBtn");
	for (const eachFavBtn of eraseFavBtns) {
		eachFavBtn.addEventListener("click", handleDeleteFromFavs);
	}
}

function renderFavsItem(eachFav) {
	favList.innerHTML += `<li class="js_addToFav " data-title="${eachFav.title}" >
			<img src="${eachFav.image_url}"></img>
			<p class="">${eachFav.title}</p>
			</li>
			<button class="favBtn js-favBtn" data-title="${eachFav.title}" title="delete favorite"> x</button>`;
}

function handleDeleteFromFavs(ev) {
	const selectedFavButton = ev.currentTarget.dataset.title;

	const selectedFavData = dataFavorites.find(
		(row) => row.title === selectedFavButton
	);

	dataFavorites = dataFavorites.filter(
		(row) => row.title !== selectedFavData.title
	);

	renderAllFavs();
	renderAnimeList();
	saveFavsInLS();
}
