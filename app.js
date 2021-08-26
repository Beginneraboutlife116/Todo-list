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
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

// create root route
app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

// create
app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  return Todo.create({ name }).then(() => res.redirect('/')).catch(error => console.log(error))
})

// view the detail
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id).lean().then(todo => res.render('detail', { todo })).catch(error => console.log(error))
})

// click edit
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