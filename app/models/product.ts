import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Category from './category.js'
import { compose } from '@adonisjs/core/helpers'
import { attachment, Attachmentable } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import { jsonField } from './decorators/json_field.js'
import Ingredient from './ingredient.js'

export default class Product extends compose(BaseModel, Attachmentable) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare store_id: number

  @column()
  declare category_id: number | null

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare price: number

  @attachment({ preComputeUrl: true })
  declare image: Attachment | null

  @column()
  declare is_active: boolean

  @jsonField()
  declare restricted_ingredients: number[] | null

  @jsonField()
  declare availability: string[] | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  /**
   * Relacionamento
   */

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>
}
