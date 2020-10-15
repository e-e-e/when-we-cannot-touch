import Express from 'express'
import path from 'path'

const PORT = 8080

const app = Express()

app.use(Express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.send('Hellos')
})

app.listen(PORT, () => {
  console.log('App started listening on port', PORT)
})
