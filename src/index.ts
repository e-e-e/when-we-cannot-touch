require('dotenv').config()

import Express from 'express'
import helmet from 'helmet/dist'
import path from 'path'
import bodyParser from 'body-parser'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import * as winston from 'winston'
import * as expressWinston from 'express-winston'

const PORT = process.env.PORT || 8080

type InputFormData = {
  name: string
  street: string
  city: string
  state: string
  postcode: string
  email: string
}

async function addItem(data: InputFormData) {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || '')
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '',
    private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  })
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]
  await sheet.addRow([data.name, data.street, data.city, data.postcode, data.state, data.email])
}

function validateInput(data: InputFormData): string | null {
  // TODO: add length validation
  if (!data.name) return 'Requires name'
  if (!data.street) return 'Requires street'
  if (!data.city) return 'Requires city'
  if (!data.postcode && data.postcode.length > 0 && data.postcode.length < 5)
    return 'Requires valid postcode'
  if (!data.email) return 'Requires valid email'
  return null
}

const app = Express()
app.use(helmet())
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: process.env.NODE_ENV === 'development' ? winston.format.cli() : winston.format.json(),
    meta: true,
  }),
)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(Express.static(path.join(__dirname, 'public')))

app.post('/info', (req, res) => {
  console.log(req.body)
  const error = validateInput(req.body)
  if (error) {
    return res.status(400).json({ status: 'error', error })
  }
  addItem(req.body)
    .then(() => {
      res.status(200).send({ status: 'ok' })
    })
    .catch((e) => {
      console.log(e)
      return res.status(500).json({ status: 'error', error: 'Unknown server error.' })
    })
})

app.listen(PORT, () => {
  console.log('App started listening on port', PORT)
})
