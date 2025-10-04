import Ingredient from '#models/ingredient'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const ingredients = [
      {
        name: 'Bacon',
        additional_price: 2.0,
        store_id: 1,
      },
      {
        name: 'Mussarela',
        additional_price: 2.0,
        store_id: 1,
      },
      {
        name: 'Leite em pó',
        additional_price: 2.0,
        store_id: 2,
      },
    ]

    // Verifica se o ingrediente já existe antes de criar
    for (const ingredient of ingredients) {
      const exists = await Ingredient.query().where('name', ingredient.name).first()
      if (!exists) {
        await Ingredient.create(ingredient)
      }
    }
  }
}
