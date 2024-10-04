import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'
import Category from './category.js'
import Order from './order.js'
import User from './user.js'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare address: string | null

  @column()
  declare contact_info: string | null

  @column()
  declare logo_url: string | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  /**
   * Relacionamentos
   */

  @hasMany(() => Product, {
    foreignKey: 'store_id',
  })
  declare products: HasMany<typeof Product>

  @hasMany(() => Category, {
    foreignKey: 'store_id',
  })
  declare categories: HasMany<typeof Category>

  @hasMany(() => Order, {
    foreignKey: 'store_id',
  })
  declare orders: HasMany<typeof Order>

  @hasMany(() => User, {
    foreignKey: 'store_id',
  })
  declare users: HasMany<typeof User>
}
