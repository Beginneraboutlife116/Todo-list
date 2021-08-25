// include express and build application server
const express = require('express')
// include mongoose
const mongoose = require('mongoose')

//include express handlebars
const exphbs = require('express-handlebars')

// include Todo model
const Todo = require('./models/todo')

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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// create root route
app.get('/', (req, res) => {
  Todo.find() // 取出 Todo Model中所有的資料
    .lean() // 把 Mongoose的 Model物件轉換成乾淨的 Javascript資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳給index.hbs
    .catch(error => console.error(error)) // 錯誤處理
})

// set listen
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})