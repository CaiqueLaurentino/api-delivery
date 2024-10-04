import StoreException from '#exceptions/store_exception'
import Store from '#models/store'

export default class CompanyService {
  /**
   * Verifica se a empresa associada ao recurso pertence ao cliente logado.
   * @param storeId - O ID da loja associada ao recurso.
   * @param userId - O ID do usuário logado.
   * @returns - A store associada ao usuário logado.
   */
  static async verifyStoreOwner(storeId: number | string, userId: number) {
    const userStore = await Store.query()
      .select('id')
      .where('id', storeId)
      .andWhere('user_id', userId)
      .first()

    if (!userStore) {
      throw StoreException.notFound()
    }

    return userStore
  }

  static async DataStore(slug: string) {
    const userStore = await Store.query()
      .where('slug', slug)
      .preload('categories', (ctg) => {
        ctg.preload('products')
      })
      .firstOrFail()

    return userStore
  }
}
