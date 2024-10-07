import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare store_id: number

  @column()
  declare name: string

  @column()
  declare additional_price: number

  @column()
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
