const toImg = (image) => {
  const img = document.createElement('img')
  img.setAttribute('src',`data:image/jpeg;base64,${image}`)
  img.style.height = '240px'
  img.style.width = '320px'
  return img
}

var socket = io();
socket.on('new_frame', function({image, location, labels, promotion}) {
  // TODO also show location and labels
  console.log(location, labels, promotion)


  // TODO switch to handlebars?
  const imgNode = toImg(image)
  const locationSpan = document.createElement('span')
  locationSpan.innerText = location
  const labelSpan = document.createElement('span')
  labelSpan.innerText = labels
  const promotionSpan = document.createElement('span')
  promotionSpan.innerText = promotion

  const containerDiv = document.createElement('span')
  containerDiv.appendChild(locationSpan)
  containerDiv.appendChild(labelSpan)
  containerDiv.appendChild(promotionSpan)
  containerDiv.appendChild(imgNode)


  const parent = document.getElementById('images')

  // Clear only if we want a single image
  if(true) { 
    parent.innerHTML = ''
  }
  parent.appendChild(containerDiv)

})