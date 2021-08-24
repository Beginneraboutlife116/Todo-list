// include express and build application server
const express = require('express')
// include mongoose
const mongoose = require('mongoose')

const app = express()
const port = 3000

// setting mongoose to connect with mongodb
// 'mongodb://......' is communication format. It's essential!
// 正確路徑：mongoose.connect('mongodb://[資料庫帳號]:[資料庫密碼]@[MongoDB位置]:[port]/[資料庫名稱]')
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

// 監控connection狀態
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// create root route
app.get('/', (req, res) => {
  res.send(`<h1>Hello world!!</h1>`)
})

// set listen
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})