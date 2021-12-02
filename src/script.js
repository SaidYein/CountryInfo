// Selecting page elements
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const countryInput = document.querySelector('.form-control')

const getCountry = async (country) => {
  const response = await fetch('https://restcountries.com/v3.1/name/'+country)
  if(response.ok){
    return response.json()
  }else{
    console.log('fetch failed')
  }
}

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
    renderCountry(country)
  }catch(error) {
    console.log(error)
  }
}


btn.addEventListener('click', main)