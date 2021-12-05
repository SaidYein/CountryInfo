"use strict";
import {
  getCountry,
  getNeighbors,
  renderNeighbors,
} from "../handlers/handlers.js";
import { renderError } from "../utils/utilities.js";
import { renderCountry } from "../views/views.js";
import { countriesContainer, countryInput } from "../constants.js";

export const searchButtonListener = async () => {
  //clearing country container
  countriesContainer.innerHTML = "";

  try {
    // changeBackground()
    const country = await getCountry(countryInput.value);
    renderCountry(country, "country");
    const neighbors = await getNeighbors(country);
    renderNeighbors(neighbors);
  } catch (error) {
    renderError(error);
  }
};
