import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'

export default class CategorySeeder extends BaseSeeder {
  async run() {
    await Category.createMany([
      {
        store_id: 1,
        name: 'Pastéis Simples',
        description: 'Pastéis com 1 ou 2 recheios!',
      },
      {
        store_id: 1,
        name: 'Pastéis Reacheados',
        description: 'Pastéis com 3 recheios',
      },
      {
        store_id: 1,
        name: 'Pastéis Especiais',
        description: 'Pastéis com 4 ou mais recheios',
      },
      {
        store_id: 2,
        name: 'Pizzas',
        description: 'Pizzas',
      },
    ])
  }
}
