require('dotenv').config()

const mongoose = require('mongoose')
const Beer = require('../models/Beer')

mongoose.connect(process.env.DB)

const beers = [
  {
    name: 'Stella Artouis',
    beerType: 'Lager',
    alcoholPercentage: 4.5,
    image:
      'data:image/jpeg;base64,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'
  },
  {
    name: 'Corona',
    beerType: 'Ale',
    alcoholPercentage: 4.5,
    image:
      'data:image/jpeg;base64,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'
  },
  {
    name: 'XX Lager',
    beerType: 'Lager',
    alcoholPercentage: 4.5,
    image:
      'data:image/jpeg;base64,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'
  }
]

Beer.create(beers)
  .then(beers => {
    console.log(`You created ${beers.length} beers succesfully`)
    mongoose.connection.close()
  })
  .catch(err => console.log(err))
