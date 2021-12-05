"use strict";
// a function to fetch data
export const fetchData = async (url, country = "") => {
  const response = await fetch(`${url}${country}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Request failed!");
};

// a function to render data
export const renderError = (error) => {
  const errorText = document.createElement("h1");
  errorText.textContent = error;
  countriesContainer.appendChild(errorText);
};
