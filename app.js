var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var autoIncrement = require('mongoose-auto-increment');
var router = require('./config/router')

var dbUrl = 'mongodb://localhost/hetang'
mongoose.Promise = global.Promise
var dbconnection = mongoose.connect(dbUrl)

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/i18n'))
app.use(bodyParser.urlencoded())

router(app)
app.listen(3000)
console.log('项目运行在 3000 端口')