import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/auth'
import Store from '#models/store'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    const store = await Store.query().select('id', 'slug').where('user_id', user.id).firstOrFail()

    return response.ok({
      token: token,
      ...user.serialize(),
      store_id: store.id,
      slug: store.slug,
    })
  }

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const user = await User.create(payload)
    return response.created(user)
  }

  // async logout({ auth, response }: HttpContext) {
  //   const user = auth.getUserOrFail()
  //   const token = auth.user?.currentAccessToken.identifier
  //   if (!token) {
  //     return response.badRequest({ message: 'Token not found' })
  //   }
  //   await User.accessTokens.delete(user, token)
  //   return response.ok({ message: 'Logged out' })
  // }
}

// const handleLogout = async () => {
//   try {
//     const response = await fetch('http://localhost:3333/logout', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Logout failed');
//     }

//     localStorage.removeItem('token');
//     navigate('/login');
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };
