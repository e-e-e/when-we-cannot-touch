function wait(t: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, t)
  })
}

function addImageToDom(img: HTMLImageElement) {
  const div = document.createElement('div')
  div.appendChild(img)
  div.style.position = 'absolute'
  div.style.top = `${Math.random() * 80 + 10}%`
  div.style.left = `${Math.random() * 100}%`
  div.style.zIndex = '-1'
  div.className = 'security'
  const scale = window.screen.width < 660 ? 0.75 : 1
  const rotation = Math.random() * 360
  div.style.transform = `translateX(-${img.width * scale}px) rotate(${rotation}deg) scale(${scale})`

  document.getElementById('signatures')?.appendChild(div)
}

function createSecurity(index: number) {
  return new Promise((resolve, reject) => {
    console.log('create')
    const img = new Image()
    img.onload = () => {
      addImageToDom(img)
      resolve()
    }
    img.onerror = (e) => {
      console.log(e)
      reject()
    }
    img.src = `./imgs/WWCT_01_Security-Window${index}.png`
  })
}

function startAnimation() {
  let promises: Promise<any> = Promise.resolve()
  for (let i = 1; i <= 7; i++) {
    promises = promises.then(() => createSecurity(i)).then(() => wait(750))
  }
}

startAnimation()
