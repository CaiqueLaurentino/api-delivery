/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ProductController = () => import('#controllers/products_controller')
const AuthController = () => import('#controllers/auth_controller')
const StoreController = () => import('#controllers/stores_controller')
const CategoryController = () => import('#controllers/categories_controller')
const OrdersController = () => import('#controllers/orders_controller')

/**
 * Login/Register Routes
 */

router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
    router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('user')

// router
//   .get('me', async ({ auth, response }) => {
//     try {
//       const user = auth.getUserOrFail()
//       return response.ok(user)
//     } catch (error) {
//       return response.unauthorized({ error: 'User not found' })
//     }
//   })
//   .use(middleware.auth())

router
  .group(() => {
    /**
     * Stores Routes
     */

    router.get('stores', [StoreController, 'index'])
    // router.get('stores/:id', [StoreController, 'show'])
    router.post('stores', [StoreController, 'store'])
    router.put('stores/:id', [StoreController, 'update'])
    router.delete('stores/:id', [StoreController, 'destroy'])

    /**
     * Categories Routes
     */

    router.get('categories', [CategoryController, 'index'])
    router.get('categories/:id', [CategoryController, 'show'])
    router.post('categories', [CategoryController, 'store'])
    router.put('categories/:id', [CategoryController, 'update'])
    router.delete('categories/:id', [CategoryController, 'destroy'])

    /**
     * Products Routes
     */

    router.get('products', [ProductController, 'index'])
    router.get('products/:id', [ProductController, 'show'])
    router.post('products', [ProductController, 'store'])
    router.put('products/:id', [ProductController, 'update'])
    router.delete('products/:id', [ProductController, 'destroy'])

    /**
     * Orders Routes
     */

    router.get('orders', [OrdersController, 'index'])
    router.post('orders', [OrdersController, 'store'])
    router.get('orders/:id', [OrdersController, 'show']) // Detalhes de um pedido específico
    router.put('orders/:id', [OrdersController, 'updateStatus']) // Atualizar status do pedido
    router.get('orders.history', [OrdersController, 'history'])
    router.delete('orders/:id', [OrdersController, 'destroy'])
  })
  .prefix('store')
  .use(middleware.auth())
  .use(middleware.validate())
