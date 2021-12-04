// Formats response to look presentable on webpage
const renderCountry = function (data, className = '') {
  //console.log(data)
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
  countriesContainer.style.opacity = 1;
};
