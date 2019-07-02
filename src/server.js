require('dotenv').config()

const moment = require('moment')
const express = require('express')
const path = require('path')
const Youch = require('youch')
const validate = require('express-validation')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'
    moment.locale('pt-br')

    this.middlewares()
    this.routes()
    this.exception()
  }

  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
    this.express.use(express.static(path.resolve(__dirname, 'public')))
  }

  exception () {
    if (process.env.NODE_ENV == 'production') {
      // The error handler must be before any other error middleware
      // this.express.use(Sentry.Handlers.errorHandler())
    }
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV != 'production') {
        const youch = new Youch(err, req)
        return res.json(await youch.toJSON())
      }

      return res
        .status(err.status || 500)
        .json({ error: 'User error connection.' })
    })
  }
}

module.exports = new App().express
