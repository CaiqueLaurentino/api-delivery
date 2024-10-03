import { BaseSeeder } from '@adonisjs/lucid/seeders'
import address from '#models/address'

export default class AddressSeeder extends BaseSeeder {
  async run() {
    await address.createMany([
      {
        store_id: 1,
        location: 'Parelheiros',
        delivery_fee: 10.0,
      },
      {
        store_id: 1,
        location: 'Colonia',
        delivery_fee: 12.5,
      },
      {
        store_id: 2,
        location: 'Alamos',
        delivery_fee: 15.0,
      },
    ])
  }
}
