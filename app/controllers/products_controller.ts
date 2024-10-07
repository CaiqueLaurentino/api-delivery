import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { createProductValidator, updateProductValidator } from '#validators/product'
import StoreService from '../services/store_service.js'
import ProductService from '#services/product_service'
import CategoryService from '#services/category_service'
import Category from '#models/category'
import { Attachment, attachmentManager } from '@jrmc/adonis-attachment'

type ObjProduct = {
  id?: number
  store_id: number
  category_id: number | null
  name: string
  description: string | null
  price: number
  image: Attachment | null
  is_active: boolean
}

type CategoryObj = {
  id: number
  store_id: number
  name: string
  description: string
  products: ObjProduct[]
}

export default class ProductController {
  async index({ request, response, auth }: HttpContext) {
    try {
      const storeId = request.header('store_id')

      await StoreService.verifyStoreOwner(storeId!, auth.user!.id)

      const categories = await Category.query().preload('products').where('store_id', storeId!)

      const products: CategoryObj[] = categories.map((category) => ({
        id: category.id,
        store_id: category.store_id,
        name: category.name,
        description: category.description ? category.description : '',
        products: category.serialize().products.map((product: ObjProduct) => ({
          id: product.id,
          store_id: product.store_id,
          category_id: product.category_id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product?.image ?? null,
          is_active: product.is_active,
        })),
      }))

      return response.ok(products)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async show({ params, response, auth, request }: HttpContext) {
    const storeId = request.header('store_id')

    const userStore = await StoreService.verifyStoreOwner(storeId!, auth.user!.id)

    const categoryId = params.id

    const category = await ProductService.verifyProduct(userStore.id, categoryId)

    return response.ok(category)
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      const storeId = request.header('store_id')

      console.log(request.body())
      const payload = await request.validateUsing(createProductValidator(storeId!))

      const store = await StoreService.verifyStoreOwner(storeId!, auth.user!.id)

      const objProduct: ObjProduct = {
        ...payload,
        store_id: store.id,
        image: null,
      }

      if (payload.image) {
        objProduct.image = await attachmentManager.createFromFile(payload.image)
      }
      const product = await Product.create(objProduct)

      return response.created(product)
    } catch (error) {
      throw error
    }
  }

  async update({ params, request, response, auth }: HttpContext) {
    const storeId = request.header('store_id')

    const userStore = await StoreService.verifyStoreOwner(storeId!, auth.user!.id)

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

      const userStore = await StoreService.verifyStoreOwner(storeId!, auth.user!.id)

      const product = await ProductService.verifyProduct(userStore.id, productId)

      await product.delete()

      return response.ok({ message: 'Produto excluído com sucesso' })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}
