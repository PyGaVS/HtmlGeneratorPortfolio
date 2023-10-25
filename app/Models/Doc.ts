import { DateTime } from 'luxon'
import { column, hasMany, HasMany, BaseModel, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'

//Models
import Code from 'App/Models/Code'
import Text from 'App/Models/Text'
import Part from 'App/Models/Part'

export default class Doc extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column.dateTime({autoCreate: true})
  public order: DateTime

  @hasMany(() => Code)
  public codes: HasMany<typeof Code>

  @hasMany(() => Text)
  public texts: HasMany<typeof Text>

  @belongsTo(() => Part)
  public part: BelongsTo<typeof Part>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

export{Doc}
