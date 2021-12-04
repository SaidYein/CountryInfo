//? Error handling ?
//? creating DOM function ?
//? Modules ?
// Selecting page elements
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const countryInput = document.querySelector('.form-control')


// get country entered from UI
const getCountry = async (country) => {
  // //clears input
  // countryInput.value= '';
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
      try{
        const result = await fetchData(url, neighbor); //???? do we have to wait this even if renderCountry function is awaiting the fetch????
        return result;
      }catch(error) {
        renderError(error)
      }
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
const getBackground = async () => {
  const AccessKey = 'ZjaOU49sKA4ymGmVNuaGK8trPmr2wI09jw4eOm9_w3c';
  // const secretKey = 'uoBJIfgv48GaEEDj3fAkGfCLYJLkABmCiY7XtHIQS0o'
  const endpoint= `https://api.unsplash.com/photos/random/?client_id=${AccessKey}`
  try{
    const response  = await fetchData(endpoint)
    return response
  }catch(error) {
    renderError(error)
  }
}

//rendering background
// const changeBackground = async() => {
//   try{
//     const backgroundImage = await getBackground()
//     document.body.style = `background:url(${backgroundImage.urls.regular})`
//   }catch(error) {
//     renderError(error)
//   }
// }

const main = async ()=>{
  //clearing country container
  countriesContainer.innerHTML= '';
  
  try{
    // changeBackground()
    const country = await getCountry(countryInput.value);
    renderCountry(country, "country")
    const neighbors = await getNeighbors(country)
    renderNeighbors(neighbors)
  }catch(error) {
    renderError(error) //?Do we have to catch error here? Because we catch errors on each time we fetch data?
  }
}

//?Is there a simpler way for ENTER?
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

// window.addEventListener('load', changeBackground)