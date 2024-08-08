import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('store_id').unsigned().references('id').inTable('stores').onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .nullable()
        .onDelete('SET NULL')
      table.enum('status', ['pending', 'in_progress', 'completed', 'cancelled']).notNullable()
      table.decimal('total_amount', 10, 2).notNullable()
      table.decimal('delivery_fee', 10, 2).notNullable()
      table.text('delivery_address').notNullable()
      table.enum('payment_method', ['cash', 'credit_card', 'debit_card', 'paypal']).notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
