import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('store_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('stores')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
      table.string('customer_name').notNullable()
      table.string('customer_contact').notNullable()
      table.enum('status', ['pending', 'in_progress', 'completed', 'cancelled']).notNullable()
      table.decimal('total_amount', 10, 2).notNullable()
      table.decimal('delivery_fee', 10, 2).notNullable()
      table
        .integer('address_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('addresses')
        .onDelete('RESTRICT') // Restrict to ensure address is valid
      table
        .enum('payment_method', ['cash', 'credit_card', 'debit_card', 'pix', 'voucher'])
        .notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
