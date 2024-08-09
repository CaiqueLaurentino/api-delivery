import { Exception } from '@adonisjs/core/exceptions'

export default class CategoryException extends Exception {
  static status = 500

  static notFound(message?: string) {
    return new this(message ?? 'Category Not Found', { status: 404, code: 'E_CATEGORY_NOT_FOUND' })
  }
}
