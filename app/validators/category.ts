import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'

export const createCategoryValidator = (storeId: number | string) =>
  vine.compile(
    vine.object({
      name: vine
        .string()
        .minLength(1)
        .maxLength(255)
        .unique(async (db: Database, value: string) => {
          const category = await db
            .from('categories')
            .where('name', value)
            .andWhere('store_id', storeId)
            .first()
          return !category
        }),
      description: vine.string().maxLength(1000).nullable(),
    })
  )

export const updateCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(1).maxLength(255).optional(),
    description: vine.string().maxLength(1000).nullable().optional(),
  })
)
