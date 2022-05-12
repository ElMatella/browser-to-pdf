import * as express from 'express'
import {Pool} from "./pool"

const app = express()

app.use(async (req, res) => {
  await Pool.use(async page => {
    try {
      await page.goto(req.query.url, {
        waitUntil: 'networkidle2'
      })
      const options: any = {}
      if (req.query.width && req.query.height) {
        options.width = req.query.width
        options.height = req.query.height
      } else {
        options.format = 'A4'
      }
      const pdf = await page.pdf(options)
      res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length })
      res.send(pdf)
    } catch (error) {
      res.status(503).send(error.message)
    }
  })
})

const PORT = process.env.PORT || 4040

app.listen(PORT, () => {
  console.log('Listening on http://localhost:' + PORT)
})
