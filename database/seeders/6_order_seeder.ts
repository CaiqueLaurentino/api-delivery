import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Order from '#models/order'

export default class OrderSeeder extends BaseSeeder {
  async run() {
    await Order.createMany([
      {
        store_id: 1,
        user_id: 1,
        customer_name: 'Joaquim',
        customer_contact: '11942007925',
        status: 'pending',
        total_amount: 49.98,
        delivery_fee: 5.0,
        address_id: 1,
        payment_method: 'pix',
      },
      {
        store_id: 2,
        user_id: 2,
        customer_name: 'Marcello',
        customer_contact: '11942007925',
        status: 'pending',
        total_amount: 29.99,
        delivery_fee: 3.5,
        address_id: 2,
        payment_method: 'credit_card',
      },
    ])
  }
}
