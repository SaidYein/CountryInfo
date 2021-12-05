"use strict";
// a function to fetch data
export const fetchData = async (url, country = "") => {
  const response = await fetch(`${url}${country}`);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Request failed!");
};
