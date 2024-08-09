import { Exception } from '@adonisjs/core/exceptions'

export default class ProductException extends Exception {
  static status = 500

  static notFound(message?: string) {
    return new this(message ?? 'Product Not Found', { status: 404, code: 'E_PRODUCT_NOT_FOUND' })
  }
}
