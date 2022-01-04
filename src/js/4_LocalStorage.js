/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable indent */
"use strict";

////FUNCIÓN QUE GUARDA EL ARRAY DE FAVORITOS EN LS COMO STRING LLAMÁNDO AL ARCHIVO FAVANIMES////
function saveFavsInLS() {
	localStorage.setItem("favAnimes", JSON.stringify(dataFavorites));
}

////FUNCIÓN QUE RECUPERA EL LS SI HAY DATOS////
function getFavsFromLS() {
	//metemos en una constante
	const storedFavs = localStorage.getItem("favAnimes");
	if (storedFavs === null) {
		dataFavorites = [];
	} else {
		//hay que parsear el archivo de LS, para que tome formato y se pueda pintar
		dataFavorites = JSON.parse(storedFavs);
		//llamamos a la función que pinta los favoritos
		renderAllFavs();
	}
}

//cogemos los favoritos al arrancar la página, llamamos a la función directamente
getFavsFromLS();
