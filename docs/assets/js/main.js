"use strict";
const searchResult = document.querySelector(".js-searchResult"),
	apiUrl = "https://api.jikan.moe/v3/search/anime?q=",
	searchInput = document.querySelector(".js-input"),
	searchBtn = document.querySelector(".js-searchBtn"),
	resetInputBtn = document.querySelector(".js-resetInput"),
	favList = document.querySelector(".js-favList");
let data = [],
	dataFavorites = [];
function renderAnime(t) {
	console.log(t),
		(searchResult.innerHTML += `<li  class="js_addToFav" data-title="${t.title}" >\n\t<img src="${t.image_url}" data-title="${t.title}></img>\n\t<p class="">${t.title}</p>\n\t\t</li>`);
}
function renderAnimeList() {
	for (const t of data) renderAnime(t);
	const t = document.querySelectorAll(".js_addToFav");
	console.log(t);
	for (const e of t) e.addEventListener("click", handleAddToFavs);
}
function getInputValue() {
	return searchInput.value;
}
function handleSearchButton(t) {
	t.preventDefault();
	let e = getInputValue();
	e.length > 2
		? fetch(`${apiUrl}${e}+ &limit=3`)
				.then((t) => t.json())
				.then((t) => {
					(data = t.results), renderAnimeList();
				})
		: alert("Please type at least 3 characters to start searching");
}
function handleAddToFavs(t) {
	t.currentTarget.classList.toggle("highlight");
	const e = t.currentTarget.dataset.title,
		n = data.find((t) => t.title === e);
	console.log(n), dataFavorites.push(n), renderAllFavs();
}
function renderAllFavs() {
	favList.innerHTML = "";
	for (const t of dataFavorites) renderFavsItem(t);
}
function renderFavsItem(t) {
	favList.innerHTML += `<li  class="js_addToFav" data-title="${t.title}" >\n\t\t\t<img src="${t.image_url}"></img>\n\t\t\t<p class="">${t.title}</p>\n\t\t\t</li>`;
}
function handleResetInput(t) {
	t.preventDefault(), (searchInput.value = ""), (searchResult.innerHTML = "");
}
searchBtn.addEventListener("click", handleSearchButton),
	resetInputBtn.addEventListener("click", handleResetInput);
