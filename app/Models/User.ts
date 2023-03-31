import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import TypeDocument from './TypesDocument'
import Rol from "./Role"

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() first_name: string
  @column() second_name: string
  @column() surname: string
  @column() second_sur_name: string
  @column() type_document: number
  @column() document_number:number
  @column() email: string
  @column() password: string
  @column() rol_id: number
  @column() phone: string
  @column() state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=> TypeDocument,{
    localKey: 'type_document',
    foreignKey: 'id'
  })
  public typeDocumento: HasMany<typeof TypeDocument>

  @hasMany(()=> Rol,{
    localKey: 'rol_id',
    foreignKey: 'id'
  })
  public rol: HasMany<typeof Rol>


}
