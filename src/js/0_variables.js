/* eslint-disable no-unused-vars */
"use strict";
/////////////////////////  VARIABLES GLOBALES /////////////////////////
const searchResult = document.querySelector(".js-searchResult");
const apiUrl = "https://api.jikan.moe/v3/search/anime?q=";
const searchInput = document.querySelector(".js-input");
const searchBtn = document.querySelector(".js-searchBtn");
const resetInputBtn = document.querySelector(".js-resetInput");
const favList = document.querySelector(".js-favList");
///Array de datos del fetch///
let data = [];

///Array de Favoritos///
let dataFavorites = [];
