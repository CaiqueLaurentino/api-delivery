import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'

export const createOrderValidator = (storeId: number | string) =>
  vine.compile(
    vine.object({
      user_id: vine
        .number()
        .optional(),
      status: vine
        .string(),
      total_amount: vine
        .number()
        .min(0),
      delivery_fee: vine
        .number()
        .min(0),
      address_id: vine
        .number()
        .exists(async (db: Database, value: number | string) => {
          const address = await db
            .from('addresses')
            .where('id', value)
            .first()
          return !!address
        }),
      payment_method: vine
        .string(),
    })
  )
