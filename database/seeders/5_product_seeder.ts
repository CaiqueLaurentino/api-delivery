import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'

export default class ProductSeeder extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        store_id: 1,
        category_id: 1,
        name: 'Bolo de Chocolate',
        description: 'Delicioso bolo de chocolate com cobertura cremosa.',
        price: 29.99,
        image_url:
          'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        is_out_of_stock: false,
      },
      {
        store_id: 2,
        category_id: 2,
        name: 'Bolacha de Manteiga',
        description: 'Bolacha crocante de manteiga, ideal para o lanche.',
        price: 9.99,
        image_url:
          'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        is_out_of_stock: false,
      },
    ])
  }
}
