import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class UserSeeder extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'john_doe',
        email: 'john@example.com',
        password: 'password123',
      },
      {
        fullName: 'jane_doe',
        email: 'jane@example.com',
        password: 'password123',
      },
    ])
  }
}
