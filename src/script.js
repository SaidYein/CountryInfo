// Selecting page elements
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const countryInput = document.querySelector('.form-control')

const getCountry = async (country) => {
  const url = 'https://restcountries.com/v3.1/name/';
  const response = await fetch(`${url}${country}`)
  if(response.ok){
    return response.json()
  }else{
    console.log('fetch failed')
  }
}

const getNeighbors = async (countryData) => {
  // below line allows us to get neighbors by country code. They came by country codes in 'borders' object not by name. 
  const alpha = 'https://restcountries.com/v3.1/alpha/';
  const neighbors = countryData[0].borders

  const neighborsArray = neighbors.map(
    async(neighbor) => {
      const neighborData = await fetch(`${alpha}${neighbor}`);

      if(neighborData.ok){
        return neighborData.json()
      }else {
        console.log('Requesting neighbors failed!')
      }
  })
  return Promise.all(neighborsArray)
}

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
  try{
    //await getBackground()
    const country = await getCountry(countryInput.value);
    renderCountry(country, "country")
    const neighbors = await getNeighbors(country)
    renderNeighbors(neighbors)
    
  }catch(error) {
    console.log(error)
  }
}

var input = document.getElementById("myInput");

input.addEventListener("keyup", (e) => {
  if (e.key === 'Enter') {
   e.preventDefault();
   btn.click();
  }
});

btn.addEventListener('click', main)