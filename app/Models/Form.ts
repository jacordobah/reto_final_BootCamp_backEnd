import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Form extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column() student_id: number
  @column() answers: string
  @column() state: boolean
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=> User,{
    localKey: 'student_id',
    foreignKey: 'id'
  })
  public user:HasMany<typeof User>
}
