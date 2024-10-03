import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Coupon extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare store_id: number

  @column()
  declare code: string

  @column()
  declare discount_amount: number

  @column.date()
  declare valid_from: DateTime

  @column.date()
  declare valid_until: DateTime

  @column()
  declare is_active: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  /**
   * Relacionamentos
   */
}
