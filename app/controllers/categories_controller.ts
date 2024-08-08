import type { HttpContext } from '@adonisjs/core/http'
import { createCategoryValidator, updateCategoryValidator } from '#validators/category'
import Category from '#models/category'
import Company from '#services/company_service'

type ObjCategory = {
  name: string
  description: string | null
  store_id: number
}

export default class CategoryController {
  async index({ response, request, auth }: HttpContext) {
    const storeId = request.header('store_id') //USAR OUTRA COISA// algum tipo de hash

    if (!storeId) {
      return response.badRequest({ message: 'ID da loja não fornecido' })
    }

    const userStore = await Company.verifyStoreOwner(storeId, auth.user!.id)

    const categories = await Category.query().where('store_id', userStore.id)

    return response.ok(categories)
  }

  async show({ params, response }: HttpContext) {
    const categoryId = params.id
    const category = await Category.find(categoryId)

    if (!category) {
      return response.notFound({ message: 'Category not found' })
    }

    return response.ok(category)
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      const storeId = request.header('store_id')

      if (!storeId) {
        return response.badRequest({ message: 'ID da loja não fornecido' })
      }

      const store = await Company.verifyStoreOwner(storeId, auth.user!.id)

      const payload = await request.validateUsing(createCategoryValidator(store.id))

      const objCategory: ObjCategory = {
        ...payload,
        store_id: store.id,
      }

      const category = await Category.create(objCategory)

      return response.created(category)
    } catch (error) {
      throw error
    }
  }

  async update({ params, request, response }: HttpContext) {
    const categoryId = params.id
    const category = await Category.find(categoryId)

    if (!category) {
      return response.notFound({ message: 'Categoria não encontrada' })
    }

    try {
      const payload = await request.validateUsing(updateCategoryValidator)

      category.merge(payload)
      await category.save()

      return response.ok(category)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    const categoryId = params.id
    const category = await Category.find(categoryId)

    if (!category) {
      return response.notFound({ message: 'Category not found' })
    }

    await category.delete()
    return response.ok({ message: 'Category deleted successfully' })
  }
}
