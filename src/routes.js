const express = require('express')
const validate = require('express-validation')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()
const controllers = require('./app/controllers')
// const UserController = require('./app/controllers/UserController')
// const SessionController = require('./app/controllers/SessionController')
// const TestAuthController = require('./app/controllers/TestAuthController')

const AuthMiddleware = require('./app/middlewares/auth')

const validators = require('./app/validators')

routes.post('/user/signin', controllers.SessionController.store)
routes.post(
  '/users',
  validate(validators.User),
  controllers.UserController.store
)

// usar esse middlaware daqui pra baixo
routes.use(AuthMiddleware)

routes.get('/test', controllers.TestAuthController.store)

// CRUD Product
routes.get('/product/', controllers.ProductController.index)
routes.post('/product/', controllers.ProductController.store)

// CRUD Product Image
routes.post(
  '/product/:id/image',
  upload.single('image'),
  controllers.ProductImageController.store
)

// CRUD Product Type Image
routes.post(
  '/producttype/:id/image',
  upload.single('image'),
  controllers.ProductTypeImageController.store
)

// CRUD Product Size Image
routes.post(
  '/productsize/:id/image',
  upload.single('image'),
  controllers.ProductSizeImageController.store
)

// CRUD ProductType
routes.get('/producttype/:product_id', controllers.ProductTypeController.index)
routes.post('/producttype/', controllers.ProductTypeController.store)

// CRUD ProductSize
routes.get(
  '/productsize/:product_type_id',
  controllers.ProductSizeController.index
)
routes.post(
  '/productsize/:product_type_id',
  controllers.ProductSizeController.store
)

// CRUD Orders
routes.get('/order', controllers.OrderController.index)
routes.post('/order', controllers.OrderController.store)

module.exports = routes
