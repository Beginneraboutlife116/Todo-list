// include mongoose
const mongoose = require('mongoose')
// use Schema module
const Schema = mongoose.Schema
// 使用js的建構子方法
const todoSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這個值是必填欄位！
  }
})
// 將這個todoSchema用module.export輸出成Todo，之後就可以使用Todo做事
module.exports = mongoose.model('Todo', todoSchema)