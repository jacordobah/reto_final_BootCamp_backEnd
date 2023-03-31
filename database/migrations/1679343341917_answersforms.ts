import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Answersforms extends BaseSchema {
  protected tableName = 'answer_forms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('form_id').unsigned().references('id').inTable('answers')
      table.integer('answer_id').unsigned().references('id').inTable('answers')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
