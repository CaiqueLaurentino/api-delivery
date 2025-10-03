import ProductException from '#exceptions/products_exception'
import Ingredient from '#models/ingredient'
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

  static async ingredients(restricted_ingredients: number[] | null, store_id: number | string) {
    if (restricted_ingredients) {
      const ingredients = await Ingredient.query()
        .whereNotIn('id', restricted_ingredients)
        .where('store_id', store_id)

      return ingredients.map((ingredient) => {
        return {
          name: ingredient.name,
          additional_price: ingredient.additional_price,
          id: ingredient.id,
        }
      })
    }
    return {}
  }
}
