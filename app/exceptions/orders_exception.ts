import { Exception } from '@adonisjs/core/exceptions'

export default class OrderException extends Exception {
  static status = 500

  static notFound(message?: string) {
    return new this(message ?? 'Order Not Found', { status: 404, code: 'E_ORDER_NOT_FOUND' })
  }
}
