/* eslint-disable no-undef */
"use strict";

///Función que resetea los resultados de búsqueda y el input///
function handleResetInput(ev) {
	ev.preventDefault();
	searchInput.value = "";
	searchResult.innerHTML = "";
}

////Función que resetea todos los favoritos////

///FALTA

//// Listener ////

resetInputBtn.addEventListener("click", handleResetInput);
