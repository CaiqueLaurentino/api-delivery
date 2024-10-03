import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'

export default class CategorySeeder extends BaseSeeder {
  async run() {
    await Category.createMany([
      {
        store_id: 1,
        name: 'Doces',
        description: 'Categoria para todos os tipos de doces.',
      },
      {
        store_id: 1,
        name: 'Bolachas',
        description: 'Categoria para bolachas e biscoitos.',
      },
    ])
  }
}
