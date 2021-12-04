// Selecting page elements
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const countryInput = document.querySelector('.form-control')

// a function to fetch data
const fetchData = async (url, country) => {
  const response = await fetch(`${url}${country}`)
  if(response.ok){
    return response.json()
  }
  throw new Error('Request failed!')
}

// a function to render data
const renderError = (error) => {
  console.log(error)
}

// Formats response to look presentable on webpage
const renderCountry = function (data, className = '') {
  
  const html = `
  <article class= 'country ${className}'>
    <img class="country__img" src="${data[0].flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data[0].name.common}</h3>
      <h4 class="country__region">${data[0].region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data[0].population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🏛</span>${data[0].capital[0]}</p>
      <p class="country__row"><span>💰</span>${Object.keys(data[0].currencies)[0]}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// get country entered from UI
const getCountry = async (country) => {
  try {
    const url = 'https://restcountries.com/v3.1/name/';
    const response = await fetchData(url, country);
    return response;
  }catch(error) {
    renderError(error)
  }
}

// get country's neighbors
const getNeighbors = async (countryData) => {
  // below line allows us to get neighbors by country code. They came by country codes in 'borders' object not by name. 
  const url = 'https://restcountries.com/v3.1/alpha/';
  const neighbors = countryData[0].borders

  const neighborsArray = neighbors.map(
    async(neighbor) => {
      const result = await fetchData(url, neighbor);
      return result;
    })
  return Promise.all(neighborsArray)
}

//rendering neighbors
const renderNeighbors = (data)=>{
  data.forEach((neighbor)=>{
    renderCountry(neighbor, 'neighbor')
  })
}

// FETCHING DATA FOR BACKGROUND
// const getBackground = async () => {
//   const query = `https://api.unsplash.com/photos/random`
//   const response  = await fetch(query)
//   if(response.ok){
//     console.log(response)
//   }else {
//     console.log('background failed')
//   }
// }



const main = async ()=>{
  countriesContainer.innerHTML= '';
  try{
    //await getBackground()
    const country = await getCountry(countryInput.value);
    renderCountry(country, "country")
    const neighbors = await getNeighbors(country)
    renderNeighbors(neighbors)
    
  }catch(error) {
    renderError(error)
  }
}

// press enter to search
const input = document.getElementById("myInput");
input.addEventListener("keyup", (e) => {
  if (e.key === 'Enter') {
   e.preventDefault();
   btn.click();
  }
});

// click button to search
btn.addEventListener('click', main)