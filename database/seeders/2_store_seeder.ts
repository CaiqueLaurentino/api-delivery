import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Store from '#models/store'
import db from '@adonisjs/lucid/services/db'
export default class StoreSeeder extends BaseSeeder {
  async run() {
    await Store.createMany([
      {
        user_id: 1,
        name: 'Pastelaria Silveira',
        slug: 'pastelaria-silveira',
        address: 'Rua das Flores, 123, São Paulo, SP',
        contact_info: 'Telefone: (11) 1234-5678',
        logo: null,
      },
      {
        user_id: 2,
        name: 'Pizzaria do João',
        slug: 'pizzaria-do-joao',
        address: 'Avenida Brasil, 456, São Paulo, SP',
        contact_info: 'Telefone: (11) 9876-5432',
        logo: null,
      },
    ])
    await db
      .from('stores')
      .update(
        'logo',
        JSON.stringify({
          meta: { dimension: { width: 460, height: 350 } },
          name: 'pss8mcftcl81nsot43dufa6o.png',
          path: 'uploads/pss8mcftcl81nsot43dufa6o.webp',
          size: 43567,
          extname: 'png',
          mimeType: 'image/png',
          originalName: 'numero-1-knd.png',
        })
      )
      .where('id', 1)
  }
}
