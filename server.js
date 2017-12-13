const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://Demo:demo@ds133746.mlab.com:33746/motivation-app', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3004, () => {
    console.log('listening on 3004')
  })
})
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  db.collection('affirm').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {affirm: result})
  })
})

app.post('/affirm', (req, res) => {
  db.collection('affirm').save({msg: req.body.msg,}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.delete('/affirm', (req, res) => {
  db.collection('affirm').findOneAndDelete({msg: req.body.msg,}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
