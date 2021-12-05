"use strict";

import { fetchData } from "../utils/utilities.js";
import { renderCountry, renderError } from "../views/views.js";

// get country entered from UI
export const getCountry = (country) => {
  // //clears input
  // countryInput.value= '';
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
  data.forEach((neighbor) => {
    renderCountry(neighbor, "neighbor");
  });
};

// FETCHING DATA FOR BACKGROUND
// const getBackground = async () => {
//   const AccessKey = 'ZjaOU49sKA4ymGmVNuaGK8trPmr2wI09jw4eOm9_w3c';
//   // const secretKey = 'uoBJIfgv48GaEEDj3fAkGfCLYJLkABmCiY7XtHIQS0o'
//   const endpoint= `https://api.unsplash.com/photos/random/?client_id=${AccessKey}`
//   try{
//     const response  = await fetchData(endpoint)
//     return response
//   }catch(error) {
//     renderError(error)
//   }
// }

//rendering background
// const changeBackground = async() => {
//   try{
//     const backgroundImage = await getBackground()
//     document.body.style = `background:url(${backgroundImage.urls.regular})`
//   }catch(error) {
//     renderError(error)
//   }
// }
