import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'
import { OrderStatus, PaymentMethods } from '../enum/enums.js'

export const createOrderValidator = () =>
  vine.compile(
    vine.object({
      store_id: vine.number(), // Garante que o store_id corresponde ao storeId fornecido
      user_id: vine.number(),
      customer_name: vine.string().maxLength(20),
      customer_contact: vine.string(),
      status: vine.enum(OrderStatus),
      total_amount: vine.number().min(0),
      delivery_fee: vine.number().min(0),
      address_id: vine.number().exists(async (db: Database, value: number | string) => {
        const address = await db.from('addresses').where('id', value).first()
        return !!address
      }),
      payment_method: vine.enum(PaymentMethods),
      items: vine
        .array(
          vine.object({
            order_id: vine.number(),
            product_id: vine.number().exists(async (db: Database, value: number | string) => {
              const product = await db.from('products').where('id', value).first()
              return !!product
            }),
            quantity: vine.number().min(1),
            price: vine.number().min(0),
          })
        )
        .minLength(1),
    })
  )

export const updateOrderValidator = (storeId: number | string) =>
  vine.compile(
    vine.object({
      user_id: vine.number(),
      status: vine.enum(OrderStatus).optional(),
      total_amount: vine.number().min(0).optional(),
      delivery_fee: vine.number().min(0).optional(),
      address_id: vine.number().optional(),
      payment_method: vine.enum(PaymentMethods).optional(),
    })
  )
