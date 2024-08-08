import type { HttpContext } from '@adonisjs/core/http'
import Store from '#models/store'
import { createStoreValidator, updateStoreValidator } from '#validators/store'

export default class StoreController {
  async index({ response }: HttpContext) {
    const stores = await Store.all()
    return response.ok(stores)
  }

  async show({ params, response }: HttpContext) {
    const storeId = params.id
    const store = await Store.find(storeId)

    if (!store) {
      return response.notFound({ message: 'Store not found' })
    }

    return response.ok(store)
  }

  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createStoreValidator)

    const storeInfo = {
      user_id: auth.user!.id,
      name: payload.name,
      slug: payload.slug,
      address: payload.address,
      contact_info: payload.contact_info,
      logo_url: payload.logo_url,
    }

    const store = await Store.create(storeInfo)
    return response.created(store)
  }

  async update({ params, request, response }: HttpContext) {
    const storeId = params.id
    const store = await Store.find(storeId)

    if (!store) {
      return response.notFound({ message: 'Store not found' })
    }

    const payload = await request.validateUsing(updateStoreValidator)
    store.merge(payload)
    await store.save()
    return response.ok(store)
  }

  async destroy({ params, response }: HttpContext) {
    const storeId = params.id
    const store = await Store.find(storeId)

    if (!store) {
      return response.notFound({ message: 'Store not found' })
    }

    await store.delete()
    return response.ok({ message: 'Store deleted successfully' })
  }
}
