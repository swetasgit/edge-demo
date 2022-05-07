const multiparty = require('multiparty')
const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const http = require('http')
const server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server)


// TODO make envVar...
const redis = require('redis');
const client = redis.createClient({
    url: 'redis://:Password@edge-demo-redis-headless.redis:6379/0'
})

client.on('error', err => {
    console.log('Redis Error ' + err);
})

const setup = async ()=>{
    await client.connect()
    client.hSet('active_promotions', 'suse_chameleon', '20% Discount to SLES Subscriptions!')

}
setup()
// // Set up promotions


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
    const firstLabel = req.body.labels.split(',')[0]
    console.log('addImageBase64', firstLabel)

    addImage(req.body)

    // TODO Lookup from DB

    client.hGet('active_promotions', firstLabel).then((promotion)=>{
        console.log('Promotion found:', promotion)

        io.emit('new_frame', {...req.body, promotion})
    })

    res.sendStatus(204)
})


app.get('/images',(req, res)=>{
    res.json(getImages())
})

const port = process.env.PORT || 8080
server.listen(port, () => {
    console.log(`App listening on port ${port}`)
})