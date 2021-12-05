"use strict";

import { renderCountry, renderError } from "../views/views.js";
import { countriesContainer, countryInput } from "../constants.js";
import { fetchData } from "../utils/utilities.js";
//import { countryCard } from "../constants.js";

// get country entered from UI
export const getCountry = (country) => {
  const url = "https://restcountries.com/v3.1/name/";
  return fetchData(url, country);
};

// get country's neighbors
export const getNeighbors = async (countryData) => {
  // below line allows us to get neighbors by country code. They came by country codes in 'borders' object not by name.
  const url = "https://restcountries.com/v3.1/alpha/";
  const neighbors = countryData[0].borders;
  if (!neighbors) {
    return [];
  }

  const neighborsArray = neighbors.map(async (neighbor) => {
    return fetchData(url, neighbor);
  });

  return Promise.all(neighborsArray);
};

//rendering neighbors
export const renderNeighbors = (data) => {
  //rendering data
  data.forEach((neighbor) => {
    renderCountry(neighbor, "neighbor");
  });
  //adding event listener to countryCards to view more info when clicked //?It changes background for now?
  const countryCards = document.querySelectorAll(".country");
  countryCards.forEach((card) => {
    card.addEventListener("click", moreInfoHandler);
  });
};

//below code (will) change the info on the card when clicked
export const moreInfoHandler = (e) => {
  e.target.parentNode.classList.toggle("backside");
};

export const searchButtonListener = async () => {
  //clearing country container
  countriesContainer.innerHTML = "";

  try {
    // changeBackground()
    const country = await getCountry(countryInput.value);
    renderCountry(country, "country");
    const neighbors = await getNeighbors(country);
    renderNeighbors(neighbors);
    //adding event listener to all cards
  } catch (error) {
    renderError(error);
  }
};
