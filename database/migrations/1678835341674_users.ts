import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name', 50).notNullable()
      table.string('second_name', 50).notNullable()
      table.string('surname', 50).notNullable()
      table.string('second_sur_name',50).notNullable()
      table.integer('type_document').unsigned().references('id').inTable('types_documents')
      table.integer('document_number').notNullable()
      table.string('email', 200).notNullable()
      table.string('password', 200).notNullable()
      table.integer('rol_id').unsigned().references('id').inTable('roles')
      table.string('phone',15).notNullable()
      table.boolean('state').defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
