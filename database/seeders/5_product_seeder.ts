import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'
import db from '@adonisjs/lucid/services/db'

export default class ProductSeeder extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        store_id: 1,
        category_id: 1,
        name: 'Pastel de Carne',
        description: 'Pastel de carne',
        price: 29.99,
        image: null,
        is_active: false,
        availability: ['sun'],
        restricted_ingredients: [1, 2],
      },
      {
        store_id: 1,
        category_id: 1,
        name: 'Pastel de Frango',
        description: 'Pastel de Frango',
        price: 29.99,
        image: null,
        is_active: false,
        availability: ['mon'],
        restricted_ingredients: [1, 2],
      },
      {
        store_id: 1,
        category_id: 1,
        name: 'Pastel de Queijo',
        description: 'Pastel de Queijo',
        price: 29.99,
        image: null,
        is_active: false,
        availability: ['tue'],
        restricted_ingredients: [1, 2],
      },
      {
        store_id: 1,
        category_id: 2,
        name: 'Pastel de Frango II',
        description: 'Pastel de Frango catupiry e bacon',
        price: 29.99,
        image: null,
        is_active: false,
        availability: ['fri'],
        restricted_ingredients: [1, 2],
      },
      {
        store_id: 1,
        category_id: 2,
        name: 'Pastel de Carne II',
        description: 'Pastel de Carne, Ovo e Bacon',
        price: 29.99,
        image: null,
        is_active: false,
        availability: ['sat'],
        restricted_ingredients: [1, 2],
      },
      {
        store_id: 1,
        category_id: 3,
        name: 'Pastel Especial Frango',
        description: 'Pastel de Frango catupiry, bacon, Milho, Calabresa',
        price: 29.99,
        image: null,
        is_active: false,
        availability: ['wed'],
        restricted_ingredients: [1, 2],
      },
      {
        store_id: 1,
        category_id: 3,
        name: 'Pastel Especial Carne',
        description: 'Pastel de Carne, Ovo, Bacon Milho, Azeitona, Tomate',
        price: 29.99,
        image: null,
        is_active: false,
        availability: ['wed'],
        restricted_ingredients: [1, 2],
      },
      {
        store_id: 2,
        category_id: 2,
        name: 'Pizza de Mussarela',
        description: 'Pizza de Mussarela',
        price: 29.99,
        image: null,
        is_active: false,
      },
    ])
    await db.from('products').update(
      'image',
      JSON.stringify({
        meta: { dimension: { width: 460, height: 350 } },
        name: 'rp2kzwkzdms7y6doiiktd7wz.png',
        path: 'uploads/rp2kzwkzdms7y6doiiktd7wz.png',
        size: 43567,
        extname: 'png',
        mimeType: 'image/png',
        originalName: 'pastel.png',
      })
    )
  }
}
