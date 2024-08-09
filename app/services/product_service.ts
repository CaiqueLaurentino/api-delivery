import ProductException from '#exceptions/product_exception'
import Product from '#models/product'

export default class ProductService {
  /**
   * Verifica se o produto é associado a loja do usuário logado.
   * @param storeId - O ID da loja associada ao recurso.
   * @param productId - O ID do produto.
   * @returns - O produto associada ao usuário logado.
   */
  static async verifyProduct(storeId: number | string, productId: number) {
    const product = await Product.query().where('id', productId).where('store_id', storeId).first()

    if (!product) {
      throw ProductException.notFound()
    }

    return product
  }
}
