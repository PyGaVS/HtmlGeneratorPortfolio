import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'

import Doc from 'App/Models/Doc'
import Result from 'App/Models/Result'
import Element from 'App/Models/Element'

export default class Code extends Element {

  @column()
  public content: string

  @column()
  public language: string

  @hasOne(() => Result)
  public result: HasOne<typeof Result>

  @belongsTo(() => Element)
  public element: BelongsTo<typeof Element>
}
