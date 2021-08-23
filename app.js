// include express and build application server
const express = require('express')
const app = express()
const port = 3000

// create root route
app.get('/', (req, res) => {
  res.send(`<h1>Hello world!!</h1>`)
})

// set listen
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})