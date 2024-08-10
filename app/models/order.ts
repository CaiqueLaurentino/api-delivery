import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import OrderItem from './order_item.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare store_id: number

  @column()
  declare user_id: number | null

  @column()
  declare status: 'pending' | 'in_progress' | 'completed' | 'cancelled'

  @column()
  declare total_amount: number

  @column()
  declare delivery_fee: number

  @column()
  declare address_id: number

  @column()
  declare payment_method: 'cash' | 'credit_card' | 'debit_card' | 'paypal'

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  /**
   * Relacionamentos
   */

  @hasMany(() => OrderItem, {
    foreignKey: 'orderId',
  })
  declare orderItems: HasMany<typeof OrderItem>
}
