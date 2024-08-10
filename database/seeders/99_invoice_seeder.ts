import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import Invoice from '#models/invoice'

export default class InvoiceSeeder extends BaseSeeder {
  async run() {
    await Invoice.createMany([
      {
        order_id: 1,
        total_amount: 49.98,
        issue_date: DateTime.fromISO('2024-08-09'),
        notes: 'Primeira fatura',
      },
      {
        order_id: 2,
        total_amount: 29.99,
        issue_date: DateTime.fromISO('2024-08-09'),
        notes: 'Segunda fatura',
      },
    ])
  }
}
