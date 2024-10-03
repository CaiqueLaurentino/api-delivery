import type { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'
import { createOrderValidator, updateOrderValidator } from '#validators/order'
import CompanyService from '#services/company_service'
import OrderService from '#services/order_service'
import { OrderStatus, PaymentMethods } from '../enum/enums.js'
import OrderItem from '#models/order_item'

type ObjOrderPost = {
  store_id: number
  user_id: number | null
  customer_name: string
  status: OrderStatus
  customer_contact: string
  total_amount: number
  delivery_fee: number
  address_id: number
  payment_method: PaymentMethods
}

type OrdItem = {
  order_id: number
  product_id: number
  quantity: number
  price: number
}

type OrderItems = OrdItem[]

type Address = {
  location: string
  delivery_fee: number
}

type ObjOrderIndex = {
  id: number
  store_id: number
  user_id: number
  customer_name: string
  customer_contact: string
  status: OrderStatus
  total_amount: string
  delivery_fee: string
  address_id: number
  payment_method: PaymentMethods
  order_items: OrderItems
  address: Address
}

export default class OrderController {
  async index({ request, response, auth }: HttpContext) {
    try {
      const storeId = request.header('store_id')

      const userStore = await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

      const orders = await Order.query()
        .where('store_id', userStore.id)
        .whereNotIn('status', [OrderStatus.COMPLETED, OrderStatus.CANCELLED])
        .preload('order_items')
        .preload('address')
        .orderBy('created_at', 'desc')

      const objOrders: ObjOrderIndex[] = orders.map((order) => ({
        id: order.id,
        store_id: order.store_id,
        user_id: order.user_id!,
        customer_name: order.customer_name,
        customer_contact: order.customer_contact, // Adiciona o número de contato do cliente
        status: order.status,
        total_amount: order.total_amount.toString(),
        delivery_fee: order.delivery_fee.toString(),
        address_id: order.address_id,
        payment_method: order.payment_method,
        order_items: order.order_items.map((item) => ({
          order_id: item.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        })),
        address: {
          location: order.address.location,
          delivery_fee: order.address.delivery_fee,
        },
      }))

      return response.ok(objOrders)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async history({ request, response, auth }: HttpContext) {
    try {
      const storeId = request.header('store_id')

      const userStore = await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

      const orders = await Order.query()
        .where('store_id', userStore.id)
        .whereIn('status', [OrderStatus.COMPLETED, OrderStatus.CANCELLED])
        .preload('order_items')
        .preload('address')
        .orderBy('created_at', 'desc')

      const objOrders: ObjOrderIndex[] = orders.map((order) => ({
        id: order.id,
        store_id: order.store_id,
        user_id: order.user_id!,
        customer_name: order.customer_name,
        customer_contact: order.customer_contact, // Adiciona o número de contato do cliente
        status: order.status,
        total_amount: order.total_amount.toString(),
        delivery_fee: order.delivery_fee.toString(),
        address_id: order.address_id,
        payment_method: order.payment_method,
        order_items: order.order_items.map((item) => ({
          order_id: item.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        })),
        address: {
          location: order.address.location,
          delivery_fee: order.address.delivery_fee,
        },
      }))

      return response.ok(objOrders)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async show({ params, request, response, auth }: HttpContext) {
    try {
      const storeId = request.header('store_id')
      await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

      const orderId = params.id
      const order = await Order.query()
        .where('id', orderId)
        .preload('order_items')
        .preload('address')
        .firstOrFail()

      return response.ok(order)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async store({ request, response, auth }: HttpContext) {
    const storeId = request.header('store_id')

    const payload = await request.validateUsing(createOrderValidator())

    const userStore = await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

    const objOrder: ObjOrderPost = {
      store_id: userStore!.id,
      user_id: payload.user_id,
      customer_name: payload.customer_name,
      customer_contact: payload.customer_contact, // Inclui customer_contact
      status: payload.status,
      total_amount: payload.total_amount,
      delivery_fee: payload.delivery_fee,
      address_id: payload.address_id,
      payment_method: payload.payment_method,
    }

    const order = await Order.create(objOrder)

    const totalAmount = payload.items.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)

    const orderItems = payload.items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }))

    await OrderItem.createMany(orderItems)

    // Atualizando o total do pedido
    await order.merge({ total_amount: totalAmount }).save()

    return response.created(order)
  }

  async updateStatus({ params, request, response, auth }: HttpContext) {
    try {
      const orderId = params.id
      const storeId = request.header('store_id')

      // Verifica se o dono da loja está autenticado
      await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

      // Pega o novo status do corpo da requisição
      const { status } = request.only(['status'])

      // Verifica se o pedido existe
      const order = await OrderService.verifyOrder(storeId!, orderId)

      // Atualiza o status
      order.status = status
      await order.save()

      // Mensagem personalizada dependendo do status
      let whatsappMessage = ''
      switch (status) {
        case OrderStatus.IN_PROGRESS:
          whatsappMessage = 'Seu pedido está sendo preparado!'
          break
        case OrderStatus.ON_DELIVERY:
          whatsappMessage = 'Seu pedido está a caminho!'
          break
        case OrderStatus.COMPLETED:
          whatsappMessage = 'Seu pedido foi entregue! Obrigado!'
          break
      }

      // Envia a mensagem pelo WhatsApp
      await OrderService.sendWhatsAppMessage(order.customer_contact, whatsappMessage)

      return response.ok({ message: 'Status do pedido atualizado com sucesso', order })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

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
