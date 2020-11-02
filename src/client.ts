let submitting = false

function clearMessage() {
  const message = document.getElementById('message')
  if (!message) return
  message.innerHTML = ''
  message.className = ''
}

function setProcessingMessage() {
  const message = document.getElementById('message')
  if (!message) return
  message.innerHTML = 'Processing'
  message.className = 'processing'
}

function setSuccessMessage() {
  const message = document.getElementById('message')
  if (!message) return
  message.innerHTML =
    'Thank you! We have received your details. If you are one of the first 100 people to register, you can expect to receive mail in the coming weeks.'
  message.className = 'success'
}

function setErrorMessage(msg: string) {
  const message = document.getElementById('message')
  if (!message) return
  message.innerHTML = msg
  message.className = 'error'
}

function disableForm() {
  const submit = document.getElementById('submit')
  if (!(submit instanceof HTMLInputElement)) return
  submit.disabled = true
  console.log('disabled')
}

function processForm(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  if (submitting) return false
  if (!(e.target instanceof HTMLFormElement)) return false
  submitting = true
  setProcessingMessage()
  const data = new FormData(e.target)
  fetch('/info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.get('name'),
      street: data.get('street'),
      city: data.get('city'),
      state: data.get('state'),
      postcode: data.get('postcode'),
      email: data.get('email'),
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      submitting = false
      if (result.status === 'ok') {
        setSuccessMessage()
        disableForm()
        return
      }
      return setErrorMessage(result.error || 'An unknown error occurred')
    })
    .catch((e) => {
      submitting = false
      return setErrorMessage('An unknown error occurred')
    })
  return false
}

document.getElementById('form')?.addEventListener('submit', processForm)

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
  const rotation = Math.random() * 360
  div.style.transform = `translateX(-100px) rotate(${rotation}deg)`

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
