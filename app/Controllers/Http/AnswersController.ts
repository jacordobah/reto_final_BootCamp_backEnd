import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer'

export default class AnswersController {
    public async create(answer: any,questionId: number){
        const answers = new Answer()
        answers.answer = answer.opcion;
        answers.is_correct = answer.iscorrect;
        answers.question_id = questionId;
        console.log(answers);
        try{
            answers.save();
            return { 
            "state": true,
            "message": "Pregunta creada exitosamente"
            }
        }catch(error){
            console.log(error);
            return{
                "state": false,
                "message": "Error al crear la pregunta"

            }
        }
    }

    public async update({request}:HttpContextContract){
        const answer = await Answer.find(request.param('id_option'))  
        if(answer){
            answer.answer = request.input('opcion');
            answer.is_correct = request.input('iscorrect');
            if (await answer.save()){
                return{
                    "state": true,
                    "message": "opcion Editada con exito"
                }
            } 
        }
        return{
            "state": false,
            "message": "Error al editar la opcion"
        }     
    }

    public async optionList({request}:HttpContextContract){
        try{
            const id_queston = request.param('id_question');
            const options = await Answer.query().select('id','answer').where('question_id',id_queston);
            if(options){
                const formato = [{
                    "id":options[0]['id'],
                    "option":options[0]['answer']
                },{
                    "id":options[1]['id'],
                    "option":options[1]['answer']
                },{"id":options[2]['id'],
                    "option":options[2]['answer']
                },{
                    "id":options[3]['id'],
                    "option":options[3]['answer']}];
                return{
                    "state": true,
                    "message": "Listado de opciones",
                    "options": formato
                }
            }
        }catch(error){
            return{
                "state": false,
                "message": "Error al obtener el listado de opciones"    
            }
        }
    }

    public async optionListOnly(id_question:number){
        console.log(id_question);
        const options = await Answer.query().select().where('question_id',id_question);
        if(options.length>0){
            //console.log(options[0].$attributes['answer']);
            let format=[{
                "id":options[0].$attributes['id'],
                "option":options[0].$attributes['answer']
            },{
                "id":options[1].$attributes['id'],
                "option":options[1].$attributes['answer']
            },{
                "id":options[2].$attributes['id'],
                "option":options[2].$attributes['answer']
            },{
                "id":options[3].$attributes['id'],
                "option":options[3].$attributes['answer']
            },
            ]
            //console.log(format)
            return format
            
        }
        return []
    }

    public async delete(question_id:number){
        try{
            await Answer.query().where('question_id',question_id).delete();
            console.log(question_id)
        }catch(error){
            console.log("en delete answers")
            console.log(error)
        }
    }
    
    

}