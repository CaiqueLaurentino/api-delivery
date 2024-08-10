import OrderException from '#exceptions/orders_exception'
import Order from '#models/order'

export default class CategoryService {
  /**
   * Verifica se a order é associada a loja do usuário logado.
   * @param storeId - O ID da loja associada ao recurso.
   * @param orderId - O ID da order.
   * @returns - A Order associada ao usuário logado.
   */
  static async verifyOrder(storeId: number | string, orderId: number) {
    const order = await Order.query()
      .where('id', orderId)
      .where('store_id', storeId)
      .first()

    if (!order) {
      throw OrderException.notFound()
    }

    return order
  }
}
