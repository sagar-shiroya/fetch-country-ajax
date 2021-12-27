function fetchCountryDetails(code){
    console.log('country details fetching: ' + code);
    
    let xhr = new XMLHttpRequest();

    xhr.open(
        'GET',
        'https://restcountries.com/v3.1/alpha/'+code,
        true
    );

    xhr.onload = function(){
        if(xhr.status == 200){
            console.log('Success');
            let country = JSON.parse(this.response);
            console.log(country);

            //Removing the old country so it won't get piled up...
            let oldChild = (document.getElementById('countryDetails'))?(document.getElementById('countryDetails')):'';
            if(oldChild) document.body.removeChild(oldChild);
            
            //Hidden the feed...
            document.body.removeChild(document.getElementById('feed'));
            
            //Create parent div for country detail
            let parentDiv = document.createElement('div');
            parentDiv.id = 'countryDetails';

            let countryName = document.createElement('p');
            countryName.innerHTML = '<h1>' + country[0].name.common + '</h1>';

            let countryFlag = document.createElement('img');
            countryFlag.src = country[0].flags.png;

            let population = document.createElement('p');
            internationalNumberFormat = new Intl.NumberFormat('en-US');
            population.innerHTML = '<b>Population:</b> ' + internationalNumberFormat.format(country[0].population);

            let timezone = document.createElement('p');
            timezone.innerHTML = '<b>Timezone:</b> ' + country[0].timezones[0]

            parentDiv.appendChild((countryName));
            parentDiv.appendChild((countryFlag));
            parentDiv.appendChild((population));
            parentDiv.appendChild((timezone));

            document.body.appendChild(parentDiv);
        }
    };
    
    xhr.send();
}

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
    // console.log(country.name.common);
    const countryDiv = document.createElement('div');
    
    // countryDiv.id = country.cca2;
    countryDiv.onclick = function() {
        fetchCountryDetails(country.cca2);
    }
    
    const countryName =document.createElement('p');
    countryName.innerHTML = country['name']['common'];

    const countryFlag = document.createElement('img');
    countryFlag.src = country['flags']['png'];

    countryDiv.appendChild(countryName);
    countryDiv.appendChild(countryFlag);
    
    let feedDiv = document.createElement('div');
    feedDiv.id = 'feed';
    document.body.appendChild(feedDiv);
    document.getElementById('feed').appendChild(countryDiv);
}
