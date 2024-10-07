import vine from '@vinejs/vine'

export const createStoreValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(5).maxLength(255),
    slug: vine.string().minLength(1).maxLength(255),
    address: vine.string().maxLength(255).nullable(),
    contact_info: vine.string().maxLength(15).nullable(),
    logo: vine.file().nullable(),
  })
)

export const updateStoreValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(1).maxLength(255).optional(),
    slug: vine.string().minLength(1).maxLength(255),
    contact_info: vine.string().maxLength(1000).nullable().optional(),
    address: vine.string().maxLength(255).nullable().optional(),
  })
)
