import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'

import Doc from 'App/Models/Doc'
import Element from 'App/Models/Element'

export default class Text extends Element {

  @column()
  public content: string

  @belongsTo(() => Element)
  public element: BelongsTo<typeof Element>;
}
