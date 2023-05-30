
// main variables
//const url = 'https://restcountries.eu/rest/v2/name/';
const url = 'https://restcountries.com/v3.1/name/';
const countriesList = document.getElementById('countries');

// hiding div with country flag, section, h2
const cInfo = document.querySelector('section');
const cFlag = document.getElementById('c-flag');
const h2CountriesList = document.querySelector('h2');
cInfo.style.display = "none";
cFlag.style.display = "none";
h2CountriesList.style.display = "none";

// main function
const searchCountries = () => {
    const countryName = document.getElementById('country-name').value;
    
    if (!countryName.length) {
        cInfo.style.display = "none";
        countriesList.textContent = "";
        h2CountriesList.style.display = "none";
    }

    fetch(url+countryName)
        .then(response => {
            if (response.status == 200) {
                 return response.json();
                } else {
                    throw Error("Empty country input")
                }
        })
        .then(json => showCountriesList(json))
        
}

const showCountriesList = (countries) => {
    countriesList.textContent = "";

    h2CountriesList.style.display = "block";

    const input = document.getElementById('country-name').value;

    countries.forEach(function(item, index) {
        if (item.name.common.toLowerCase().includes(input.toLowerCase())) {           
            let li = document.createElement('li');
            li.setAttribute('key', index);
            li.innerText = item.name.common;
            countriesList.appendChild(li);
        }        
    })

    // filling in country data after click
    const countryList = [...document.querySelectorAll('#countries li')];
    countryList.forEach(country=> country.addEventListener('click', function(){

        const clickedItem = country.getAttribute('key');
        
        cInfo.style.display = "block";
        cFlag.style.display = "block";

        const offName = document.querySelector('#off p');
        const cname = document.getElementById('c-name');
        const capital = document.querySelector('#cap p');
        const population = document.querySelector('#pop p');
        const area = document.querySelector('#are p');
        const language = document.querySelector('#lan p');
        const currency = document.querySelector('#cur p');
        //const dialing = document.querySelector('#dia p');
         
        cname.textContent = "";
        cname.textContent = countries[clickedItem].name.common;

        offName.textContent = countries[clickedItem].name.official;
        capital.textContent = countries[clickedItem].capital;
        population.textContent = countries[clickedItem].population.toLocaleString("pl-PL");
        area.textContent = countries[clickedItem].area.toLocaleString("pl-PL");
        language.textContent = '';
        const langVal = Object.values(countries[clickedItem].languages);
        langVal.forEach((value, index, array) => {
            if(index === array.length - 1){
                language.textContent += value;
            } else {
                language.textContent += value + ', ';
            };       
        });
        
        const currencyKey = Object.keys(countries[clickedItem].currencies);
        const currencyArray = Object.values(countries[clickedItem].currencies);
        currency.textContent = '';
        currencyArray.forEach((value, index, array)=> {
            if(index === array.length -1) {
                currency.textContent += value.name + ' - ' + currencyKey[index];
            } else {
                currency.textContent += value.name + ' - ' + currencyKey[index] + ', ';
            };
        })

        // console.log(countries[clickedItem].currencies)
        // console.log(Object.keys(countries[clickedItem].currencies));      
        // console.log(currencyArray[0].name);
        
        document.querySelector('img').src = countries[clickedItem].flags.png;
        }))
}

// click search - running main function
document.querySelector('button').addEventListener('click', searchCountries);
// running main function on Enter click
document.querySelector('#country-name').addEventListener('keyup', function(event){
    if (event.keyCode === 13) {
        searchCountries();
    }
})

