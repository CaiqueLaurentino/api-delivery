import AddressException from '#exceptions/address_exception'
import Address from '#models/address'

export default class CategoryService {
  /**
   * Verifica se o address é associado a loja do usuário logado.
   * @param storeId - O ID da loja associada ao recurso.
   * @param addressId - O ID do address.
   * @returns - O address associada ao usuário logado.
   */
  static async verifyAddress(storeId: number | string, addressId: number) {
    const address = await Address.query().where('id', addressId).where('store_id', storeId).first()

    if (!address) {
      throw AddressException.notFound()
    }

    return address
  }
}
