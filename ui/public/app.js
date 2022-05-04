const toImg = (image) => {
  const img = document.createElement('img')
  img.setAttribute('src',`data:image/jpeg;base64,${image}`)
  img.style.height = '240px'
  img.style.width = '320px'
  return img
}

var socket = io();
socket.on('new_frame', function({image, location, labels}) {
  // TODO also show location and labels

  const imgNode = toImg(image)
  const parent = document.getElementById('images')

  // Clear only if we want a single image
  if(true) { 
    parent.innerHTML = ''
  }

  parent.appendChild(imgNode)
})