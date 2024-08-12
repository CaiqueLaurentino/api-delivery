import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'
import { Status, PaymentMethods } from '../enum/enums.js'

export const createOrderValidator = (storeId: number | string) =>
  vine.compile(
    vine.object({
      user_id: vine
        .number(),
      status: vine
        .enum(Status),
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
        .enum(PaymentMethods),
    })
  )

  export const updateOrderValidator = (storeId: number | string) =>
    vine.compile(
      vine.object({
        user_id: vine
          .number(),
        status: vine
          .enum(Status).optional(),
        total_amount: vine
          .number()
          .min(0).optional(),
        delivery_fee: vine
          .number()
          .min(0).optional(),
        address_id: vine
          .number().optional(),
        payment_method: vine
          .enum(PaymentMethods).optional(),
      })
    )
