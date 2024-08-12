import type { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'
import { createOrderValidator, updateOrderValidator } from '#validators/order'
import CompanyService from '#services/company_service'
import OrderService from '#services/order_service'
// import AddressService from '#services/address_service'
import { PaymentMethods, Status } from '#/enum/enums.js'

type ObjOrder = {
  store_id: number
  user_id: number | null
  status: Status
  total_amount: number
  delivery_fee: number
  address_id: number
  payment_method: PaymentMethods
}

export default class OrderController {
  async index({ request, response, auth }: HttpContext) {
    try {
      const storeId = request.header('store_id')

      await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

      const orders = await Order.query().where('store_id', storeId!)

      return response.ok(orders)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async show({ params, request, response, auth }: HttpContext) {
    try {
      const storeId = request.header('store_id')

      await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

      const orderId = params.id

      const order = await OrderService.verifyOrder(storeId!, orderId)

      return response.ok(order)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      const storeId = request.header('store_id')

      const payload = await request.validateUsing(createOrderValidator(storeId!))

      const userStore = await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

      const objOrder: ObjOrder = {
        ...payload,
        store_id: userStore!.id,
      }

      const order = await Order.create(objOrder)

      return response.created(order)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  // async update({ params, request, response, auth }: HttpContext) {
  //   try {
  //     const storeId = request.header('store_id')

  //     await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

  //     const orderId = params.id

  //     const order = await OrderService.verifyOrder(storeId!, orderId)

  //     const payload = await request.validateUsing(updateOrderValidator)

  //     if (payload.address_id) {
  //       await AddressService.verifyAddress(storeId!, payload.address_id)
  //     }

  //     order.merge(payload)
  //     await order.save()

  //     return response.ok(order)
  //   } catch (error) {
  //     return response.badRequest({ message: error.message })
  //   }
  // }

  async destroy({ params, request, response, auth }: HttpContext) {
    try {
      const orderId = params.id
      const storeId = request.header('store_id')

      await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

      const order = await OrderService.verifyOrder(storeId!, orderId)

      await order.delete()

      return response.ok({ message: 'Order successfully deleted' })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}
