import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { createProductValidator, updateProductValidator } from '#validators/product'
import Company from '#services/company_service'
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
  // List all products with optional filtering by store
  async index({ request, response, auth }: HttpContext) {
    try {
      const userId = auth.user!.id

      const storeId = request.header('store_id')

      if (!storeId) {
        return response.badRequest({ message: 'ID da loja não fornecido' })
      }

      await Company.verifyStoreOwner(storeId, userId)

      const products = await Product.query().where('store_id', storeId)

      return response.ok(products)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      const storeId = request.header('store_id')

      if (!storeId) {
        return response.badRequest({ message: 'ID da loja não fornecido' })
      }

      const payload = await request.validateUsing(createProductValidator(storeId))

      const store = await Company.verifyStoreOwner(storeId, auth.user!.id)

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
    try {
      const productId = params.id
      const payload = await request.validateUsing(updateProductValidator)

      // Obtém o ID da loja do header
      const storeId = request.header('store_id')

      if (!storeId) {
        return response.badRequest({ message: 'ID da loja não fornecido' })
      }

      const store = await Company.verifyStoreOwner(storeId, auth.user!.id)

      const product = await Product.query()
        .where('id', productId)
        .andWhere('store_id', store.id)
        .first()

      if (!product) {
        return response.notFound({ message: 'Produto não encontrado ou não faz parte da loja' })
      }

      if (payload.category_id) {
        const category = await Category.find(payload.category_id)

        if (!category) {
          return response.badRequest({ message: 'Categoria não encontrada' })
        }
      }

      const existingProduct = await Product.query()
        .where('store_id', store.id)
        .andWhere((q) => {
          if (payload.name) {
            q.where('name', payload.name)
          }
          if (payload.description) {
            q.orWhere('description', payload.description)
          }
          q.whereNot('id', productId)
        })
        .first()

      if (existingProduct) {
        return response.badRequest({
          message: 'Produto com o mesmo nome ou descrição já foi cadastrado',
        })
      }

      // Atualiza o produto
      product.merge(payload)
      await product.save()

      return response.ok(product)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async destroy({ params, request, response, auth }: HttpContext) {
    try {
      const productId = params.id
      const storeId = request.header('store_id')

      if (!storeId) {
        return response.badRequest({ message: 'ID da loja não fornecido' })
      }

      const store = await Company.verifyStoreOwner(storeId, auth.user!.id)

      const product = await Product.query()
        .where('id', productId)
        .andWhere('store_id', store.id)
        .first()

      if (!product) {
        return response.notFound({ message: 'Produto não encontrado ou não pertence à loja' })
      }

      await product.delete()

      return response.ok({ message: 'Produto excluído com sucesso' })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }
}
