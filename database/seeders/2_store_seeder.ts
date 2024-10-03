import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Store from '#models/store'

export default class StoreSeeder extends BaseSeeder {
  async run() {
    await Store.createMany([
      {
        user_id: 1,
        name: 'Doceria Silva',
        slug: 'doceria-silva',
        address: 'Rua das Flores, 123, São Paulo, SP',
        contact_info: 'Telefone: (11) 1234-5678',
        logo_url: 'https://example.com/logo-doceria-silva.png',
      },
      {
        user_id: 2,
        name: 'Padaria do João',
        slug: 'padaria-do-joao',
        address: 'Avenida Brasil, 456, São Paulo, SP',
        contact_info: 'Telefone: (11) 9876-5432',
        logo_url: 'https://example.com/logo-padaria-do-joao.png',
      },
    ])
  }
}
