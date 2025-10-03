import ProductController from '#controllers/products_controller'
import StoreException from '#exceptions/store_exception'
import Store from '#models/store'
import ProductService from './product_service.js'

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

  static async DataStore(slug: string, store_id: number | string) {
    const userStore = await Store.query()
      .where('id', store_id)
      .where('slug', slug)
      .preload('categories', (ctg) => {
        ctg.preload('products')
      })
      .firstOrFail()

    const categoriesWithProducts = []

    for (const category of userStore.categories) {
      const productsWithIngredients = []

      for (const product of category.products) {
        const ingredients = await ProductService.ingredients(
          product.restricted_ingredients,
          store_id
        )

        productsWithIngredients.push({
          ...product.serialize(),
          restricted_ingredients: ingredients,
        })
      }

      categoriesWithProducts.push({
        ...category.serialize(),
        products: productsWithIngredients,
      })
    }

    return {
      id: userStore.id,
      address: userStore.address,
      categories: categoriesWithProducts,
      contact_info: userStore.contact_info,
      logo: userStore.logo,
      name: userStore.name,
      slug: userStore.slug,
      user_id: userStore.id,
    }
  }
}
