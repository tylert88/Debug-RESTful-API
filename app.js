const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const _ = require('lodash')

app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())

// Tea data
const uuid = require('uuid/v4')
let teas = [
  { id: '89bf4a36-3b74-4f79-ae80-c6ec9af8ea50', brand: 'Celestial Seasonings', name: 'Sleepytime' }
]

// GET ALL
app.get('/teas', (req, res) => {
  res.json({ data: teas })
})

// GET BY ID
app.get('/teas/:id', (req, res) => {
  const { id } = req.params
  const tea = _.find(teas, { id })

  if (tea) {
    res.status(200).json({ data: tea })
  } else {
    res.status(404).json({ error: { message: 'Tea not found.' }})
  }
})

// CREATE NEW TEA
app.post('/teas', (req, res) => {
  const { brand, name } = req.body
  const tea = { brand, name }

  if (brand && name) {
    tea.id = uuid()
    teas.push(tea)
    res.status(201).json({ data: tea })
  } else {
    res.status(400).json({ error: { message: 'Could not create new tea.' }})
  }
})

// UPDATE TEA
app.put('/teas/:id', (req, res) => {
  const { id } = req.params
  const previous = _.findIndex(teas, { id })

  if (previous === -1) {
    res.status(404).json({ error: { message: 'Tea not found.' }})
  } else {
    const { brand, name } = req.body

    if (brand && name) {
      const { id } = teas[previous]
      teas[previous] = { id, brand, name }
      res.status(200).json({ data: teas[previous] })
    } else {
      res.status(400).json({ error: { message: 'Could not update existing tea.' }})
    }
  }
})

// DELETE TEA
app.delete('/teas/:id', (req, res) => {
  const { id } = req.params
  const previous = _.findIndex(teas, { id })

  if (previous === -1) {
    res.status(404).json({ error: { message: 'Tea not found.' }})
  } else {
    teas.splice(previous, 1)
    res.status(204).json()
  }
})

const listener = () => `Listening on port ${port}!`
app.listen(port, listener)

module.exports = app
