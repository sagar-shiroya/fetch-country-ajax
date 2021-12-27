function fetchCountry() {
    let xhr = new XMLHttpRequest();

    xhr.open(
        'GET',
        'https://restcountries.com/v3.1/all',
        true
    );

    xhr.onload = function(){
        if(xhr.status == 200){
            console.log('Success');
            let countries = JSON.parse(this.response);
            countries.forEach(fetchCountryName)
        }
    };
    
    xhr.send();
}

function fetchCountryName(country) {

    const countryDiv = document.createElement('div');
    
    const countryName =document.createElement('p');
    countryName.innerHTML = country['name']['common'];

    const countryFlag = document.createElement('img');
    countryFlag.src = country['flags']['png'];

    countryDiv.appendChild(countryName);
    countryDiv.appendChild(countryFlag);
    
    document.getElementById('feed').appendChild(countryDiv);
}
