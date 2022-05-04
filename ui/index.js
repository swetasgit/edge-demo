const multiparty = require('multiparty')
const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const http = require('http')
const server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server)




app.use(express.static('public/'))


// Quick data structure
const bufferSize = process.env.COUNT || 3
const buffer = []

const addImage = (image) => {
    buffer.push(image)
    if (buffer.length > bufferSize) buffer.shift()
}

const getImages = () => {
    return buffer
}

app.use(bodyParser.json())
app.post('/addImageBase64', (req, res) => {
    console.log('addImageBase64')

    addImage(req.body)

    // TODO Lookup from DB


    io.emit('new_frame', req.body)
    
    res.sendStatus(204)
})


app.get('/images',(req, res)=>{
    res.json(getImages())
})

const port = process.env.PORT || 8080
server.listen(port, () => {
    console.log(`App listening on port ${port}`)
})