// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AnswerForm from "App/Models/AnswerForm";


export default class AnswersFormsController {
    public async create(form_id:number,answer_id:number):Promise<number>{
        const answerForm = new AnswerForm()
        answerForm.form_id = form_id;
        answerForm.answer_id = answer_id;
        if (await answerForm.save()){
            return 1
        }else{
            return 0
        }
    }
}
