import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypesDocument from 'App/Models/TypesDocument';

export default class TypeDocumentsController {
    public async create({request, response}:HttpContextContract){
        const {name} = request.all();
        //console.log(name);
        try{
            const validar = await TypesDocument.query().where('name',name);
            //console.log(validar)
            if(validar.length == 0){
                const typeDocument = new TypesDocument();
                typeDocument.name = name;
                await typeDocument.save();
                return response.status(200).json({
                    "status":true,
                    "message":"Tipo de documento creado exitosamente"
                })
            }else{
                return response.status(400).json({
                    "status":false,
                    "message":"Tipo de documento ya existe"
                });
            }
        }catch(error){
            //console.log(error);
            //response.status(500)
            return ({
                "status":false,
                "message":"Error en el servidor"
            })
        } 
    }
}
