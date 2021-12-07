# Land Inspector App

API Project

## Description

<p><strong>Land Inspector</strong> app is created by Html CSS and JavaScript. In this app, we use API to get and render basic data about a country and its neighbors by entering a value to input field on the screen</p>
<image src="./public/screenshot.png"></image>

### Features

- This is a single page application
- The app uses API to get data from <a href="https://restcountries.com/">https://restcountries.com</a>
- A user can enter a country name in to the input field to display the data recieved
- A user can trigger search by either pressing 'Enter' or clicking the search icon on the screen
- A user can see countries and their information listed in different cards on screen
- The country data card includes the following information: Flag, population (in millions), capital and currency
- The country searched is distinguished by its size and its position. (Top layer is the country searched, below layers are neighbors (if ther is any))

### Future Improvements

- Changing background color/image for every search
- Adding clickable feature to cards to fetch and display more detailed info.

### Folder Structure

```
|____.vscode
| |____settings.json
|
|____public
| |____.DS_Store
| |____screenshot.png
| |____logo.png
| |____style.css
| |____logo.jpegAppFolder
|
|____src
| |____constants.js
| |____index.html
| |____.DS_Store
| |____utils
| | |____utilities.js
| |____script.js
| |____views
| | |____views.js
| |____listeners
| | |____listeners.js
| |____handlers
| | |____handlers.js
|
|____README.md

```
