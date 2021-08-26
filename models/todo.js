// include mongoose
const mongoose = require('mongoose')
// use Schema module
const Schema = mongoose.Schema

const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Todo', todoSchema)