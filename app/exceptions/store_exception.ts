import { Exception } from '@adonisjs/core/exceptions'

export default class StoreException extends Exception {
  static status = 500

  static notFound(message?: string) {
    return new this(message ?? 'Store Not Found', { status: 404, code: 'E_STORE_NOT_FOUND' })
  }
}
