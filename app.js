// include express and build application server
const express = require('express')
// include mongoose
const mongoose = require('mongoose')

//include express handlebars
const exphbs = require('express-handlebars')

// include bodyParser
const bodyParser = require('body-parser')

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

// 讓每個request都經過bodyParser
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

// create root route
app.get('/', (req, res) => {
  Todo.find() // 取出 Todo Model中所有的資料
    .lean() // 把 Mongoose的 Model物件轉換成乾淨的 Javascript資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳給index.hbs
    .catch(error => console.error(error)) // 錯誤處理
})

// create /todos/new
app.get('/todos/new', (req, res) => {
  res.render('new')
})

// 接收 form傳回來的post
app.post('/todos', (req, res) => {
  const name = req.body.name
  // const todo = new Todo({ name })
  // return todo.save().then(() => res.redirect('/')).catch(error => console.log(error))

  return Todo.create({ name }).then(() => res.redirect('/')).catch(error => console.log(error))
})

// view the detail
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id).lean().then(todo => res.render('detail', { todo })).catch(error => console.log(error))
})

// click edit, render edit page
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id).lean().then(todo => res.render('edit', { todo })).catch(error => console.log(error))
})

// when users click "save"
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  return Todo.findById(id).then(todo => {
    todo.name = name
    return todo.save()
  }).then(() => res.redirect(`/todos/${id}`)).catch(error => console.log(error))
})

// click delete
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  return Todo.findById(id).then(todo => todo.remove()).then(() => res.redirect('/')).catch(error => console.log(error))
})

// set listen
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})