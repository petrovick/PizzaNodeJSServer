const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')
const mailConfig = require('../../config/mail')

const transport = nodemailer.createTransport(mailConfig)

const viewPath = path.resolve(__dirname, '..', 'views', 'emails')

const partialPath = path.resolve(viewPath, 'partials')

console.log('partialPath')
console.log(partialPath)

console.log('viewPath')
console.log(viewPath)
/*
const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: partialPath,
    layoutsDir: partialPath,
    defaultLayout: 'order.hbs'
  },
  viewPath: viewPath,
  extName: '.hbs'
}

transport.use('compile', hbs(handlebarOptions))
*/

transport.use(
  'compile',
  hbs({
    viewEngine: exphbs.create({
      extName: '.hbs',
      partialsDir: partialPath,
      layoutsDir: partialPath,
      defaultLayout: 'order.hbs'
    }),
    viewPath: viewPath,
    extName: '.hbs'
  })
)

module.exports = transport
