import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question';
import AnswersController from './AnswersController';

export default class QuestionsController {
    public async create({request, response}:HttpContextContract){
        const {question, options} = request.all();
        const questions = new Question();
        
        try{
            questions.question = question;
            await questions.save()
            console.log(questions.id);
            //question= await Question.query().select('id').where('answer','=',ask);
            const answer = new AnswersController();
            for(let i = 0; i<4;i++){
                answer.create(options[i],questions.id);
            }
            return response.status(200).json({
                "state": true,
                "message": "Pregunta creada exitosamente"
                });
        }catch(error){
            return {
                "state": false,
                "message": "Error al crear la pregunta"
        
            };
        } 
    }

    public async getQuestions({response}:HttpContextContract){
        try{
            const questions  = await Question.query().select('question','id')
            return response.status(200).json({
                "state":true,
                "questions":questions
            })
        }catch(error){
            console.log(error)
            return response.status(400).json({
                "state": false,
                "message": "Error al listar las preguntas"          
            });
        }
    }

    public async delete({request, response}: HttpContextContract){
        try{
            const id = request.param('id_question');
            const ac = new AnswersController();
            await ac.delete(id);
                //const qs = new Question();
            console.log(id);
            await Question.query().where('id',id).delete();
            return response.status(200).json({
                "state": true,
                "message": "Pregunta Eliminada con exito"
            });
        }catch(error){
            console.log(error)
            return response.status(400).json({
                "state": false,
                "message": "Error al eliminar la pregunta"                        
            });
        }
     }

    public async update({request,response}:HttpContextContract){
            try{
                const id = request.param('id_question');
                const questions  = await Question.find(id);
                if(questions){
                    questions.question = request.input('question');
                    questions.save()
                    return response.status(200).json({
                        "state": true,
                        "message": "Pregunta Editada con exito"
                    });
                }else{
                    return response.status(400).json({
                        "state": false,
                        "message": "Error al editar la pregunta"
                
                    });
        }
        }catch(error){
            console.log(error);
            return response.status(500).json({
                "state": false,
                "message": "Error al editar la pregunta"        
            });
        }
    }

    


}

