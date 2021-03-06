"use strict";

import { btn } from "./constants.js";
import { searchButtonListener } from "./handlers/handlers.js";

// press enter to search
const input = document.getElementById("myInput");
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    btn.click();
  }
});

// click button to search
btn.addEventListener("click", searchButtonListener);
