import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column() answer: string
  @column() is_correct: boolean
  @column() question_id: number
  @column() state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=> Question,{
    localKey: 'question_id',
    foreignKey: 'id'
  }) 
  public question:HasMany<typeof Question>

}
