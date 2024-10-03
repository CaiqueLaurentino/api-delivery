import CategoryException from '#exceptions/category_exception'
import Category from '#models/category'

export default class CategoryService {
  /**
   * Verifica se a categoria é associada a loja do usuário logado.
   * @param storeId - O ID da loja associada ao recurso.
   * @param categoryId - O ID da categoria.
   * @returns - A Categoria associada ao usuário logado.
   */
  static async verifyCategory(storeId: number | string, categoryId: number) {
    const category = await Category.query()
      .where('id', categoryId)
      .where('store_id', storeId)
      .first()

    if (!category) {
      throw CategoryException.notFound()
    }

    return category
  }
}
