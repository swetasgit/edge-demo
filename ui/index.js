const multiparty = require('multiparty')
const express = require('express')
var bodyParser = require('body-parser')

const app = express()

const port = process.env.PORT || 8080

app.use(express.static('public/'))


// Quick data structure
const bufferSize = process.env.COUNT || 3
const buffer = []

const addImage = (image) => {
    buffer.push(image)
    if (buffer.length > bufferSize) buffer.shift
}

const getImages = () => {
    return buffer
}

app.post('/addImage', (req, res) => {

    var form = new multiparty.Form()
    form.on('error', () => { res.send(500) })
    form.on('close', () => { res.send(200) })

    // listen on field event for title
    form.on('field', function (name, val) {
        if (name !== 'title') return;
        title = val;
    })

    // listen on part event for image file
    form.on('part', function (part) {
        if (!part.filename) return

        const bufferArr = []

        part.on('readable', function() {
          for (;;) {
            let buf = part.read()
            if (!buf) { break; }
            bufferArr.push(buf)
          }
        })


        part.on('end', ()=>{
            addImage(Buffer.concat(bufferArr).toString('base64'))
        })
    })

    // parse the form
    form.parse(req)
})

app.use(bodyParser.json())
app.post('/addImageBase64', (req, res) => {
    console.log('addImageBase64')

    addImage(req.body.image)
    res.send(204)
})


app.get('/images',(req, res)=>{
    res.json(getImages())
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})