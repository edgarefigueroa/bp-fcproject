require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
//const  axios = require("axios");
const {} = require('./controller.js')
const {SERVER_PORT} = process.env || 4004
const {seed, getMedia, createMedia, deleteMedia, getVideoGames, getBoardGames, getBooks} = require('./controller.js')

app.use(express.json())
app.use(cors())


// todo redo path and endpoints below
const path = require("path")
app.use(express.static(path.join(__dirname, "../public")));
const serveIndex = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))};

// endpoint for index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))  
})

// endpoint for index.js 
app.get("/js", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.js')) 
  })

// DEV
app.post('/seed', seed)

// Media
app.get('/media', getMedia)
app.get('/videoGames', getVideoGames)
app.get('/boardGames', getBoardGames)
app.get('/books', getBooks)

app.post('/media', createMedia)
app.delete('/media/:id', deleteMedia)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))