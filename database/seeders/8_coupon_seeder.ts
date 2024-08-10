import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import Coupon from '#models/coupon'

export default class CouponSeeder extends BaseSeeder {
  async run() {
    await Coupon.createMany([
      {
        store_id: 1,
        code: 'DISCOUNT10',
        discount_amount: 10.0,
        valid_from: DateTime.fromISO('2024-08-01'),
        valid_until: DateTime.fromISO('2024-08-31'),
        is_active: true,
      },
      {
        store_id: 2,
        code: 'FREESHIP',
        discount_amount: 5.0,
        valid_from: DateTime.fromISO('2024-08-15'),
        valid_until: DateTime.fromISO('2024-09-15'),
        is_active: true,
      },
    ])
  }
}
