/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable indent */
"use strict";

function saveFavsInLS() {
	localStorage.setItem("favAnimes", JSON.stringify(dataFavorites));
}

function getFavsFromLS() {
	const storedFavs = localStorage.getItem("favAnimes");
	if (storedFavs === null) {
		dataFavorites = [];
	} else {
		dataFavorites = JSON.parse(storedFavs);
		renderAllFavs();
	}
}

getFavsFromLS();
