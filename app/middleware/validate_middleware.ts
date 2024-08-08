import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ValidateMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const storeId = ctx.request.header('store_id')

    if (!storeId) {
      return ctx.response.badRequest({ message: 'ID da loja não fornecido' })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    return next()
  }
}
