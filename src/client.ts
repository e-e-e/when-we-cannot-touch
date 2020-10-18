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
  message.innerHTML = 'Successfully submited'
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
  if (submitting) return
  if (!(e.target instanceof HTMLFormElement)) return
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
