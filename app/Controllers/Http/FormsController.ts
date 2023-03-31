import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import Answer from 'App/Models/Answer';
//import { HttpContext } from '@adonisjs/core/build/standalone';
import Question from 'App/Models/Question'
import AnswersController from './AnswersController';
import Form from 'App/Models/Form';
import AnswersFormsController from './AnswersFormsController';
import User from 'App/Models/User';


export default class FormsController {
    public async getQuestions(){
        let questions = await Question.query();
        if(questions){
            const ansControl = new AnswersController()
            
           
            let formato = [{
                "question": questions[0]["question"],
                "id": questions[0]["id"],
                "options": await ansControl.optionListOnly(questions[0]["id"])
            }]
            console.log(formato);
            if (questions.length > 0){
                for(let i=1; i < questions.length; i++){
                    let n = {
                        "question": questions[i]["question"],
                        "id": questions[i]["id"],
                        "options": await ansControl.optionListOnly(questions[i]["id"])
                    };
                    //console.log(n);
                    formato.push(n); //??
                }
            }
            return {
                "state":true,
                "questions": formato
            }
        }
        return {
            "state":false,
            "message":"Fallo al listar preguntas"
        }
    }

  public async saveForm({request}:HttpContextContract){
    try{    
        const estudianteId = request.input('estudianteId');
        console.log(estudianteId);
        const user = await User.query().select().where('id',estudianteId,).andWhere('rol_id',2);
        //preguntar si se hace directocon la llave de la tabla o el documento del estudiante
        console.log(user)
        if(user.length>0){
            const form = new Form()
            form.student_id = estudianteId;
            const answers = request.input('answers');
            form.answers = answers;
            await form.save()
                
            const ansForm = new AnswersFormsController() 
            for(let i =0;i<answers.length;i++){
                if ((await ansForm.create(form.id,answers[i])) == 0){
                    return {
                        "state": false,
                        "message": "1No se pudieron almacenar las respuestas"
                    }
                }
            }
            return{
                "state": true,
                "message": "Respuestas almacenadas con exito"
            }
        }else{
            return {
                "state": false,
                "message": "2No se pudieron almacenar las respuestas"
            }
        }
    }catch(error){
        console.log(error)
        return{
            "state": false,
            "message": "No se pudieron almacenar las respuestas"
        }
    }

  }


}
