"use strict";
import { countriesContainer, errorContainer } from "../constants.js";
// Formats response to look presentable on webpage
export const renderCountry = function (data, className = "") {
  //add another piece of html for the backside of the cards. It will be visible upon particular className
  const html = `
  <article class= 'country ${className}' >
    <img class="country__img" src="${data[0].flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data[0].name.common}</h3>
      <h4 class="country__region">${data[0].region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data[0].population / 1000000
      ).toFixed(1)}m people</p>
      <p class="country__row"><span>🏛</span>${data[0].capital[0]}</p>
      <p class="country__row"><span>💰</span>${
        Object.keys(data[0].currencies)[0]
      }</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};

// a function to render data
export const renderError = (error) => {
  const errorText = document.createElement("h1");
  errorText.textContent = error;
  errorContainer.appendChild(errorText);
};
