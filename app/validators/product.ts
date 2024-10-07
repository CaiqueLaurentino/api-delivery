import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'

export const createProductValidator = (storeId: number | string) =>
  vine.compile(
    vine.object({
      // id: vine.number(),
      category_id: vine
        .number()
        .positive()
        .exists(async (db: Database, value: string) => {
          const category = await db.from('categories').where('id', value).first()
          return category
        }),
      name: vine
        .string()
        .minLength(1)
        .maxLength(255)
        .unique(async (db: Database, value: string) => {
          const product = await db
            .from('products')
            .where('name', value)
            .andWhere('store_id', storeId)
            .first()
          return !product
        }),
      description: vine.string().maxLength(1000).nullable(),
      price: vine.number().min(0),
      image: vine.file().nullable(),
      is_active: vine.boolean(),
    })
  )

export const updateProductValidator = vine.compile(
  vine.object({
    category_id: vine.number().positive().nullable().optional(),
    name: vine.string().minLength(1).maxLength(255).optional(),
    description: vine.string().maxLength(1000).nullable().optional(),
    price: vine.number().min(0).optional(),
    image_url: vine.string().url().nullable().optional(),
    is_active: vine.boolean().optional(),
  })
)
