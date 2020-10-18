let submitting = false

function processForm(e: Event) {
  e.preventDefault()
  if (submitting) return
  if (!(e.target instanceof HTMLFormElement)) return
  submitting = true
  const data = new FormData(e.target)
  console.log(data)
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
      if (result) return
    })
    .catch((e) => {
      submitting = false
    })
  return false
}

document.getElementById('form')?.addEventListener('submit', processForm)
