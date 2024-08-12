import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import OrderItem from './order_item.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Address from './address.js'
import { OrderStatus, PaymentMethods } from '../enum/enums.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true, columnName: 'id' })
  declare id: number

  @column({ columnName: 'store_id' })
  declare store_id: number

  @column({ columnName: 'user_id' })
  declare user_id: number | null

  @column({ columnName: 'customer_name' })
  declare customer_name: string

  @column({ columnName: 'customer_contact' })
  declare customer_contact: string

  @column({ columnName: 'status' })
  declare status: OrderStatus

  @column({ columnName: 'total_amount' })
  declare total_amount: number

  @column({ columnName: 'delivery_fee' })
  declare delivery_fee: number

  @column({ columnName: 'address_id' })
  declare address_id: number

  @column({ columnName: 'payment_method' })
  declare payment_method: PaymentMethods

  @column.dateTime({ autoCreate: true, serializeAs: null, columnName: 'created_at' })
  declare createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serializeAs: null,
    columnName: 'updated_at',
  })
  declare updatedAt: DateTime

  /**
   * Relacionamentos
   */

  @hasMany(() => OrderItem, {
    foreignKey: 'order_id',
  })
  declare order_items: HasMany<typeof OrderItem>

  @belongsTo(() => Address, {
    foreignKey: 'address_id',
  })
  declare address: BelongsTo<typeof Address>
}
