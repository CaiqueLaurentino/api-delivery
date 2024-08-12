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
        image_url: 'https://example.com/bolo-chocolate.png',
        is_out_of_stock: false,
      },
      {
        store_id: 2,
        category_id: 2,
        name: 'Bolacha de Manteiga',
        description: 'Bolacha crocante de manteiga, ideal para o lanche.',
        price: 9.99,
        image_url: 'https://example.com/bolacha-manteiga.png',
        is_out_of_stock: false,
      },
    ])
  }
}
