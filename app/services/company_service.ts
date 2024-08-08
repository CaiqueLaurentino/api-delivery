import Store from '#models/store'

export default class Company {
  /**
   * Verifica se a empresa associada ao recurso pertence ao cliente logado.
   * @param storeId - O ID da loja associada ao recurso.
   * @param userId - O ID do usuário logado.
   * @returns - A store associada ao usuário logado.
   */
  static async verifyStoreOwner(storeId: number | string, userId: number) {
    // Verifica se a loja pertence ao usuário
    const store = await Store.query().where('id', storeId).andWhere('user_id', userId).first()

    if (!store) {
      throw new Error('Loja não encontrada ou não pertence ao usuário')
    }

    return store
  }
}
