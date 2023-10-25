import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import Doc from 'App/Models/Doc'
import Result from 'App/Models/Result'

export default class Code extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @column()
  public language: string

  @column()
  public docId: number

  @column.dateTime({autoCreate: true})
  public order: DateTime

  @hasOne(() => Result)
  public result: HasOne<typeof Result>

  @belongsTo(() => Doc)
  public doc: BelongsTo<typeof Doc>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
