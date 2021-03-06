const express = require('express')
const cors = require('cors')
const handle = require('express-async-handler')
const validate = require('express-validation')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()

routes.all('*', cors())
const controllers = require('./app/controllers')
// const UserController = require('./app/controllers/UserController')
// const SessionController = require('./app/controllers/SessionController')
// const TestAuthController = require('./app/controllers/TestAuthController')

const AuthMiddleware = require('./app/middlewares/auth')

const validators = require('./app/validators')

routes.post('/admin/signin', handle(controllers.SessionAdminController.store))
routes.post('/user/signin', handle(controllers.SessionController.store))
routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)

// usar esse middlaware daqui pra baixo
routes.use(AuthMiddleware)

routes.post(
  '/admin/users',
  validate(validators.User),
  handle(controllers.UserAdminController.store)
)
routes.get('/test', handle(controllers.TestAuthController.store))

// CRUD Product
routes.get('/product/', handle(controllers.ProductController.index))
routes.post(
  '/product/',
  validate(validators.Product),
  handle(controllers.ProductController.store)
)

// CRUD Product Image
routes.post(
  '/product/:id/image',
  upload.single('image'),
  handle(controllers.ProductImageController.store)
)

// CRUD Product Type Image
routes.post(
  '/producttype/:id/image',
  upload.single('image'),
  handle(controllers.ProductTypeImageController.store)
)

// CRUD Product Size Image
routes.post(
  '/productsize/:id/image',
  upload.single('image'),
  handle(controllers.ProductSizeImageController.store)
)

// CRUD ProductType
routes.get(
  '/producttype/:product_id',
  handle(controllers.ProductTypeController.index)
)
routes.post(
  '/producttype/',
  validate(validators.ProductType),
  handle(controllers.ProductTypeController.store)
)

// CRUD ProductSize
routes.get(
  '/productsize/:product_type_id',
  handle(controllers.ProductSizeController.index)
)
routes.post(
  '/productsize',
  validate(validators.ProductSize),
  handle(controllers.ProductSizeController.store)
)

// CRUD Orders
routes.get('/user/orders', handle(controllers.OrderController.index))
routes.post(
  '/user/orders',
  validate(validators.Order),
  handle(controllers.OrderController.store)
)

// Admin Orders
routes.get('/admin/orders', handle(controllers.OrderAdminController.index))
routes.get(
  '/admin/orders/:id/products',
  handle(controllers.OrderProductAdminController.index)
)

module.exports = routes
