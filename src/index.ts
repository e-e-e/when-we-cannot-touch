require('dotenv').config()

import Express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import { GoogleSpreadsheet } from 'google-spreadsheet'
const PORT = 8080

async function addItem(data: {
  name: string
  street: string
  city: string
  state: string
  postcode: string
  email: string
}) {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || '')
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
    private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  })
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]
  await sheet.addRow([Math.random()])
}

const app = Express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(Express.static(path.join(__dirname, 'public')))

app.post('/info', (req, res) => {
  console.log(req.body)
  res.sendStatus(200)
  // addItem()
  //   .then(() => {
  //     res.sendStatus(200)
  //   })
  //   .catch((e) => {
  //     console.log(e)
  //     res.sendStatus(500)
  //   })
})

app.listen(PORT, () => {
  console.log('App started listening on port', PORT)
})
