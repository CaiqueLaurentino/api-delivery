import type { HttpContext } from '@adonisjs/core/http'
import { createCategoryValidator, updateCategoryValidator } from '#validators/category'
import Category from '#models/category'
import CompanyService from '#services/company_service'
import CategoryService from '#services/category_service'
import CategoryException from '#exceptions/category_exception'

type ObjCategory = {
  name: string
  description: string | null
  store_id: number
}

export default class CategoryController {
  async index({ response, request, auth }: HttpContext) {
    const storeId = request.header('store_id')

    const userStore = await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

    const categories = await Category.query().where('store_id', userStore.id)

    return response.ok(categories)
  }

  async show({ params, response, auth, request }: HttpContext) {
    const storeId = request.header('store_id')

    const userStore = await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

    const categoryId = params.id

    const category = await CategoryService.verifyCategory(userStore.id, categoryId)

    if (!category) {
      throw CategoryException.notFound()
    }

    return response.ok(category)
  }

  async store({ request, response, auth }: HttpContext) {
    const storeId = request.header('store_id')

    const userStore = await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

    const payload = await request.validateUsing(createCategoryValidator(userStore.id))

    const objCategory: ObjCategory = {
      ...payload,
      store_id: userStore.id,
    }

    const category = await Category.create(objCategory)

    return response.created(category)
  }

  async update({ params, request, response, auth }: HttpContext) {
    const storeId = request.header('store_id')

    const userStore = await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

    const categoryId = params.id

    const category = await CategoryService.verifyCategory(userStore.id, categoryId)

    const payload = await request.validateUsing(updateCategoryValidator)

    category.merge(payload)
    await category.save()

    return response.ok(category)
  }

  async destroy({ params, response, request, auth }: HttpContext) {
    const storeId = request.header('store_id')

    const userStore = await CompanyService.verifyStoreOwner(storeId!, auth.user!.id)

    const categoryId = params.id

    const category = await CategoryService.verifyCategory(userStore.id, categoryId)

    await category.delete()
    return response.ok({ message: 'Category deleted successfully' })
  }
}
