const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const PERENUAL_KEY = process.env.PERENUAL_KEY;

console.log(PERENUAL_KEY)
//read file? store in object
const list = JSON.parse(fs.readFileSync('speciesList.json'));
//list = [ {label: 'Aloe vera'}, {label: 'Monstera'} ]

async function updateList(start, end) {
  //already saved 1-60
  for(let i = start; i <= end; i++){
    console.log(`Page ${i}`)
    let results = await fetch(`https://perenual.com/api/species-list?key=${PERENUAL_KEY}&page=${i}`)
    let parsedResults = await results.json();
    for(const plant of parsedResults.data){
      list.push({label: plant.common_name})
    }
  }

  //write object to speciesList.json
  fs.writeFile('speciesList.json', JSON.stringify(list) , function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
}

updateList(61,100);



