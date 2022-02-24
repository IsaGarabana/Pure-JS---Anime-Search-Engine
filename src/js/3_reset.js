/* eslint-disable no-undef */
"use strict";

function handleResetInput(ev) {
	ev.preventDefault();
	searchInput.value = "";
	searchResult.innerHTML = "";
}

function handleResetFavs(ev) {
	dataFavorites = [];
	renderAllFavs();
	renderAnimeList();
	saveFavsInLS();
}

resetInputBtn.addEventListener("click", handleResetInput);
resetFavsBtn.addEventListener("click", handleResetFavs);
