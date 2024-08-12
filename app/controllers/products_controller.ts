import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { createProductValidator, updateProductValidator } from '#validators/product'
import CompanyService from '#services/company_service'
import ProductService from '#services/product_service'
import CategoryService from '#services/category_service'
import Category from '#models/category'

type ObjProduct = {
  store_id: number
  category_id: number | null
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_out_of_stock: boolean
}

export default class ProductController {
  async index({ request, response, auth }: HttpContext) {
    try {
      const storeId = request.header('store_id')

      await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

      const products = await Category.query().preload('products').where('store_id', storeId!)

      return response.ok(products)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async show({ params, response, auth, request }: HttpContext) {
    const storeId = request.header('store_id')

    const userStore = await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

    const categoryId = params.id

    const category = await ProductService.verifyProduct(userStore.id, categoryId)

    return response.ok(category)
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      const storeId = request.header('store_id')

      const payload = await request.validateUsing(createProductValidator(storeId!))

      const store = await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

      const objProduct: ObjProduct = {
        ...payload,
        store_id: store.id,
      }

      const product = await Product.create(objProduct)

      return response.created(product)
    } catch (error) {
      throw error
    }
  }

  async update({ params, request, response, auth }: HttpContext) {
    const storeId = request.header('store_id')

    const userStore = await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

    const productId = params.id

    const product = await ProductService.verifyProduct(userStore.id, productId)

    const payload = await request.validateUsing(updateProductValidator)

    if (payload.category_id) {
      await CategoryService.verifyCategory(userStore.id, payload.category_id)
    }

    product.merge(payload)
    await product.save()

    return response.ok(product)
  }

  async destroy({ params, request, response, auth }: HttpContext) {
    try {
      const productId = params.id
      const storeId = request.header('store_id')

      const userStore = await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

      const product = await ProductService.verifyProduct(userStore.id, productId)

      await product.delete()

      return response.ok({ message: 'Produto excluído com sucesso' })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}
