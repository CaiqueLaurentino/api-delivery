import StoreException from '#exceptions/store_exception'
import Store from '#models/store'
import User from '#models/user'

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

  static async DataStore(storeId: number | string, userId: number) {
    // Verifique se o usuário é o proprietário da loja
    await this.verifyStoreOwner(storeId, userId)

    // Carregar a loja e seus dados associados
    const userStore = await Store.query()
      .where('id', storeId)
      .preload('products') // Carrega produtos da loja
      .preload('categories') // Carrega categorias da loja
      .preload('orders', (query) => {
        query.preload('orderItems', (orderItemsQuery) => {
          orderItemsQuery.preload('product')
        })
      })
      // .preload('coupons')  // Se você tiver cupons
      // .preload('invoices')  // Se você tiver faturas
      // .preload('delivery_drivers')  // Se você tiver motoristas de entrega
      .firstOrFail()

    return userStore
  }
}
