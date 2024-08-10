import { Exception } from '@adonisjs/core/exceptions'

export default class AddressException extends Exception {
  static status = 500

  static notFound(message?: string) {
    return new this(message ?? 'Address Not Found', { status: 404, code: 'E_ADDRESS_NOT_FOUND' })
  }
}
