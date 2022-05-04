const toImg = ({image}) => {
  const img = document.createElement('img')
  img.setAttribute('src',`data:image/jpeg;base64,${image}`)
  img.style.height = '240px'
  img.style.width = '320px'
  return img
}

setInterval(()=>{
  fetch('/images').then(response => response.json())
  .then( images => {
    return images.map(toImg)
  }).then((nodes)=>{
      const parent = document.getElementById('images')
      parent.innerHTML = ''
      nodes.forEach(node => parent.appendChild(node))
  }).catch((err)=>{
      console.log(err)
  })
},10*1000)


var socket = io();
socket.on('', function(msg) {
  // TODO
});