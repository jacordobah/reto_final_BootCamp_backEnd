import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
export default class RolesController {
    public async create({request,response}: HttpContextContract){
        try{
            const {name} = request.all()
            const validar = await Role.query().where('name',name);
            console.log(validar)
            console.log(validar.length)
            if(validar.length==0){
                //console.log(descripcion)
                await Role.create(name);
                response.status(200).json({"msg": "Registro de perfil completado"})
            } else {
                response.status(400).json({"msg":"Error, el rol ya se encuentra registrado"})
            }
        }catch(error){
           // console.log(error)
            //console.log(500)
            return {"msg":"Error en el servidor !!"}
        }
    }
    
}
