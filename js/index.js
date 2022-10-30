async function getCountryPopulation(country){
    try{
        const url =  `https://countriesnow.space/api/v0.1/countries/population`;
        const options = {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({country})
        };

        const res = await fetch(url,options)
        const json = await res.json()

        return json.data.populationCounts.at(-1).value;
    }catch(err){
        console.log(`My Error: no data for ${country} `) 
        throw err
    }

}


//--------------------------------------------------------
//  Manual - call one by one...
//--------------------------------------------------------

// (async () => {
//     let population = await getCountryPopulation("France")
//     console.log(`population of France is ${population}`);
//     population = await getCountryPopulation("Germany")
//     console.log(`population of Germany is ${population}`)

// })().catch(err=> console.log('Error in manual: ',err.message));
// manual()


//--------------------------------------------------------
//  Parallel processing 
//--------------------------------------------------------
const countries = ["France","Russia","Germany","United Kingdom","Portugal","Spain","Netherlands","Sweden","Greece","Czechia","Romania","Israel"];

async function parallel() {
    try{
        let promises = countries.map(country => getCountryPopulation(country))
        const populations = await Promise.allSettled(promises)
        // console.log(`Got populations for ALL countries!`);
        // console.log(`countries: ${populations}`);
        populations.forEach((population,i)=> console.log(`population of ${countries[i]} is ${population.value? population.value: population.reason}`));
    }catch(err){
        console.log(err.message)
    }

    // .catch(err=> console.log('Error in sequence: ',err.message));

}
// parallel();
//------------------------------
//   Sequential processing 
//------------------------------
// function sequence() {

//     Promise.each(countries, (country) => {
//         return getCountryPopulation(country)
//                     .then(population => {
//                         console.log(`population of ${country} is ${population}`);
//                     })
//                     .catch(err => console.error(`${country} failed: ${err.message}`))
        
//     })
//     .then(countries => {
//         console.log(`Got population for ALL countries!`);
//         console.log(`countries: ${countries}`);
//     })
//     .catch(err=> console.log('Error in sequence: ',err.message));

// }
sequence();

async function sequence(){
    try{
        for (let country of countries){
            let population = await getCountryPopulation(country);
            console.log(`population of ${country} is ${population}`);
        }
        // console.log(`Got population for ALL countries!`);
        // console.log(`countries: ${countries}`);
    } catch(err){
        console.log('Error in sequence: ',err.message)
    }
}