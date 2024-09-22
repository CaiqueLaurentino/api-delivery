import OrderException from '#exceptions/orders_exception'
import Order from '#models/order'

export default class OrderService {
  /**
   * Verifica se a order é associada à loja do usuário logado.
   * @param storeId - O ID da loja associada ao recurso.
   * @param orderId - O ID da order.
   * @returns - A Order associada ao usuário logado.
   */
  static async verifyOrder(storeId: number | string, orderId: number) {
    const order = await Order.query().where('id', orderId).where('store_id', storeId).first()

    if (!order) {
      throw OrderException.notFound()
    }

    return order
  }

  /**
   * Envia uma mensagem de atualização de status para o cliente via WhatsApp.
   * @param customerContact - Número de telefone do cliente.
   * @param message - Mensagem a ser enviada.
   */
  static async sendWhatsAppMessage(customerContact: string, message: string) {
    // URL para o WhatsApp Web
    const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${customerContact}&text=${encodeURIComponent(message)}`
    console.log(`Enviando mensagem para: ${customerContact} - Conteúdo: ${message}`)
    // Simule ou envie a mensagem para o cliente usando a URL gerada
    return whatsappWebUrl
  }
}
