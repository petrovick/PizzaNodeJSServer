require('dotenv').config()

const moment = require('moment')
const express = require('express')
const path = require('path')
const Youch = require('youch')
const Sentry = require('@sentry/node')
const validate = require('express-validation')
const sentryConfig = require('./config/sentry')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'
    moment.locale('pt-br')

    this.sentry()
    this.middlewares()
    this.routes()
    this.exception()
  }

  sentry () {
    Sentry.init(sentryConfig)
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(Sentry.Handlers.requestHandler())
  }

  routes () {
    this.express.use(require('./routes'))
    this.express.use(express.static(path.resolve(__dirname, 'public')))
  }

  exception () {
    // The error handler must be before any other error middleware
    this.express.use(Sentry.Handlers.errorHandler())

    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV != 'production') {
        const youch = new Youch(err, req)
        return res.json(await youch.toJSON())
      }

      return res.status(err.status || 500).json({ error: 'Server error.' })
    })
  }
}

module.exports = new App().express
