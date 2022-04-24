const toImg = (b64) => {
  const img = document.createElement('img')
  img.setAttribute('src',`data:image/jpeg;base64,${b64}`)
  return img
}

setInterval(()=>{
  fetch('/images').then((images)=>{
    return images.map(toImg)
  }).then((nodes)=>{
      document.getElementById('images').replaceChildren(nodes)
  }).catch((err)=>{
      console.log(err)
  })
},10*1000)