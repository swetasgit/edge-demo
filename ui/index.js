const express = require('express')
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
            addImage(Buffer.concat(bufferArr))
        })
    })

    // parse the form
    form.parse(req)
})


app.get('/images',(req, res)=>{
    res.send(
        getImages().map(
            (b)=>(
                b.toString('base64'))))
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})