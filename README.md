# when we cannot touch

A temporary website for a mail art curated by Melissa Ratliff and Bree Richards.

## About

‘When we cannot touch, art is the object that passes between us.’ This project draws inspiration from this recent observation by writer Olivia Laing and from ‘Mail Art’, a movement which began in the 1960s and which, over time, has taken a variety of forms: postcards, poems, drawings, collages, prints, faxes, emails and blogs. A means to communicate simply, and beyond more conventional means of exhibition or sale, the recipients are typically artists and other art-world inhabitants.

A group of artists and writers have been invited to enter into an exchange with a known or fictional correspondent, and then share some aspect of this colloquy in two-dimensional form with a wider audience, via postal distribution.

This offline, slow-time gesture of solidarity provides a means with which to come together when physical proximity is not possible. The act of receiving a letter in this digital age seems almost archaic, and yet, in these times of social isolation, this playful form of exchange provides a more personal means with which to connect, across time and space. When the pace of change—with one crisis and threat overwritten by the next—has made thinking, the act of making sense, nearly impossible, its simple proposition is to enrich the everyday.

## Installation

### Requirements

- node
- yarn
- A google sheet and a service account with permissions to edit the sheet.
- You will also need to create a heading row in the sheet with the following titles:
_Name_, _Street_, _City_, _State_, _Postcode_, _Email_.

### Running

1. Install dependencies with `yarn install`
2. Create a `.env` file
  ```
  GOOGLE_PRIVATE_KEY={Your Google Service Account Key}
  GOOGLE_SERVICE_ACCOUNT_EMAIL={Your Google Service Account Email}
  GOOGLE_SHEET_ID={ID of the google spreed sheet to use}
  ```
3. Run `yarn dev`

### Building

Simply run `yarn build` to generate production artifacts.


