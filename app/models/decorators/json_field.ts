import type { ColumnOptions, LucidModel } from '@adonisjs/lucid/types/model'

/**
 * JSON (jsonField) decorator
 */
export const jsonField = (options?: Partial<ColumnOptions>) => {
  return function decorateAsColumn(target: any, property: string) {
    const Model = target.constructor as LucidModel
    Model.boot()

    const normalizedOptions = Object.assign(
      {
        consume: (value: any) => (value && typeof value === 'string' ? JSON.parse(value) : value),
        prepare: (value: any) => (value ? JSON.stringify(value) : null),
        meta: {},
      },
      options
    )

    /**
     * Define the property as a column too
     */
    normalizedOptions.meta.type = 'json'
    Model.$addColumn(property, normalizedOptions)
  }
}
