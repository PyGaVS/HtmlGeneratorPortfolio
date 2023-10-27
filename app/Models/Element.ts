import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import Code from 'App/Models/Code'
import Text from 'App/Models/Text'
import Doc from 'App/Models/Doc'

export default class Element extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column.dateTime({autoCreate: true})
  public order: DateTime

  @column()
  public docId: number

  @column()
  public type: string

  @belongsTo(() => Doc)
  public doc: BelongsTo<typeof Doc>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
