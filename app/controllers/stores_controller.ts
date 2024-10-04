import type { HttpContext } from '@adonisjs/core/http'
import Store from '#models/store'
import { createStoreValidator, updateStoreValidator } from '#validators/store'
import StoreService from '../services/store_service.js'

export default class StoreController {
  async show({ response, view, params }: HttpContext) {
    const { slug } = params

    const store = await StoreService.DataStore(slug)

    if (!store) {
      return response.notFound({ message: 'Store not found' })
    }

    return view.render('pages/menu', { store })
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
