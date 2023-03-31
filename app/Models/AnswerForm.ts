import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'
import Form from './Form'

export default class AnswerForm extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() form_id:number
  @column() answer_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=> Form,{
    localKey: 'form_id',
    foreignKey: 'id'
  })
  public answerForm: HasMany<typeof Form>

  @hasMany(()=> Answer,{
    localKey: 'answer_id',
    foreignKey: 'id'
  })
  public answerForm1: HasMany<typeof Answer>
}
