import { BaseSeeder } from '@adonisjs/lucid/seeders'
import DeliveryDriver from '#models/delivery_driver'

export default class DeliveryDriverSeeder extends BaseSeeder {
  async run() {
    await DeliveryDriver.createMany([
      {
        store_id: 1,
        name: 'Carlos Silva',
        phone_number: '1234567890',
        address: 'Rua A, 123, São Paulo',
      },
      {
        store_id: 2,
        name: 'Mario Oliveira',
        phone_number: '0987654321',
        address: 'Rua B, 456, São Paulo',
      },
    ])
  }
}
