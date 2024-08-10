import { BaseSeeder } from '@adonisjs/lucid/seeders'
import OrderItem from '#models/order_item'

export default class OrderItemSeeder extends BaseSeeder {
  async run() {
    await OrderItem.createMany([
      {
        order_id: 1,
        product_id: 1,
        quantity: 2,
        price: 29.99,
      },
      {
        order_id: 1,
        product_id: 2,
        quantity: 1,
        price: 9.99,
      },
      {
        order_id: 2,
        product_id: 1,
        quantity: 1,
        price: 29.99,
      },
    ])
  }
}
