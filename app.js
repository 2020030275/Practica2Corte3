const http = require("http")
const express = require("express")
const app = express()
const ejs = require('ejs');
const bodyparser = require('body-parser')
const router = require('./router/index')
const path = require('path')
const port = 3001

app.set('view engine',"ejs")
app.use(express.static(__dirname +'/public'))
// app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())
app.use(router)
app.engine('html', require('ejs').renderFile)







app.listen(port, () => {
    console.log("Iniciando puerto 3001")
  })

  app.use((req,res,next)=>{
    res.status(404).sendFile(__dirname + "/public/error.html")
})

