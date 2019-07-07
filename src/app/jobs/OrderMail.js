const Mail = require('../services/mail')

class OrderMail {
  get key () {
    return 'OrderMail'
  }

  async handle (jobs, done) {
    const { order, user } = jobs.data

    await Mail.sendMail({
      from: '"Gabriel Petrovick" <petrovickg@hotmail.com>',
      to: 'petrovickg@gmail.com',
      subject: `Solicitação de compra ${order.id}`,
      template: 'order',
      context: { user: user, order: order }
    })

    return done()
  }
}

module.exports = new OrderMail()
