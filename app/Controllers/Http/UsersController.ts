import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'
import jwt from 'jsonwebtoken'
const bcryptjs = require('bcryptjs')

export default class UsersController {
    public async createAdmin ({request, response}: HttpContextContract){
    
        try{
            const {firstName, secondName, surname, secondSurName, typeDocument,
                documentNumber, email, password, phone} = request.all();
                const salt = bcryptjs.genSaltSync();
                const user = new User();
                user.first_name = firstName;
                user.second_name = secondName;
                user.surname = surname;
                user.second_sur_name = secondSurName;
                user.type_document = typeDocument;
                user.document_number = documentNumber;
                user.email = email;
                user.password =  bcryptjs.hashSync( password, salt );
                user.rol_id = 1;
                user.phone = phone;
            const adm = await User.query().where('document_number',documentNumber);
            if (adm.length>0){
                    //console.log(400)
                    return response.status(400).json({"state": false, "message": "Fallo en la creación del estudiante"})
                }
            await user.save()
            return response.status(200).json({"state":true, "message":"Administrador creado correctamente"})
        }catch(error){
            console.log(error)
            return {"state": false, "message": "Fallo en la creación del administrador"}
        }
    }

    public async create ({request, response}: HttpContextContract){
       
            try{
                const {firstName, secondName, surname, secondSurName, typeDocument,
                    documentNumber, email,password, phone} = request.all();
                    const salt = bcryptjs.genSaltSync();
                    const user = new User();
                    user.first_name = firstName;
                    user.second_name = secondName;
                    user.surname = surname;
                    user.second_sur_name = secondSurName;
                    user.type_document = typeDocument;
                    user.document_number = documentNumber;
                    user.email = email;
                    user.password = password;
                    user.password =  bcryptjs.hashSync( password, salt );
                    user.rol_id =2;
                    user.phone = phone;
                const student = await User.query().where('document_number',documentNumber);
                if (student.length>0)
                    {return response.status(400).json({"state": false, "message": "Fallo en la creación del estudiante"})}
                await user.save()
                return response.status(200).json({"state":true, "message":"estudiante creado correctamente"})
            }catch(error){
                //console.log(error);
                //console.log(500);
                return response.status(500).json({"state": false, "message": "Fallo en la creación del estudiante"})
            }
        }

    public async login({request, response}:HttpContextContract){
        
        try{
            const email = request.input('email');
            const password = request.input('password');
            const user = await User.findBy('email', email);
            if(!user){
                return response.status(400).json({ 
                "state": false,
                "message": "constraseña o email invalido "
                })
            }
            const validPassword = bcryptjs.compareSync(password, user.password);

            if(!validPassword){
                return response.status(400).json({ 
                    "state": false,
                    "message": "constraseña o email invalido "
                    })
            }
            const payload = {
                "state": user.state,
                "id": user.id,
                "document": user.document_number,
                "name": user.first_name + " " + user.second_name + " " + user.surname + " " + user.second_sur_name,
                "role": user.rol_id,
            }
            const token:string = this.generateToken(payload);
            //console.log(token);
            response.status(200).json({
                token,
                "state": "true",
                "id": user.id,
                "name": user.first_name + " " + user.second_name + " " + user.surname + " " + user.second_sur_name,
                "role": user.rol_id,
                "message":"Ingreso exitoso"
            })
        }catch(error){
            console.log(error);
            response.status(500).json({
                "state": false,
                "message": "constraseña o email invalido "
            })
        }
    }

    public generateToken(payload: any):string{
        const option = {
            expiresIn: "60 mins"
        }
        return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), option)
    }

    public verifyToken(authorizationHeader:string){
        let token = authorizationHeader.split(' ')[1]
        token = jwt.verify(token, Env.get('JWT_SECRET_KEY'), (error)=>{
            if(error){
                throw new Error("Token Expirado");
            }
        })
        return true;
    }

    public getPayload (authorizationHeader:string) {
        let token = authorizationHeader.split(' ')[1]
        const payload = jwt.verify(token, Env.get("JWT_SECRET_KEY"), {complete: true}).payload
        console.log(payload)
        return payload
      }

      public async getStudentList({response}:HttpContextContract){
        try{
            const users = await User.query().select('first_name','second_name','surname','second_sur_name',
            'type_document','document_number','email','phone').where('rol_id','=','2');
            return response.status(200).json({
                "status":true,
                "message": "Listado de estudiantes",
                "users": users
            });
        }catch(error){
            console.log(error)
            return ({
                "status":false,
                "message": "Fallo en el listado de estudiantes"
            });
        }
      }

    public async update({request, params, response}:HttpContextContract){
        const user = await User.find(params.id_user)
        if (user){
            console.log(user)
            user.first_name = request.input('firstName');
            user.second_name = request.input('secondName');
            user.surname = request.input('surname');
            user.second_sur_name = request.input('secondSurName');
            user.type_document = request.input('typeDocument');
            user.document_number = request.input('documentNumber');
            user.email = request.input('email');
            user.phone = request.input('phone');
            if(await user.save()){
                return response.status(200).json({    
                    "state": true,
                    "message": "Se actualizo correctamente"
                });
            }
        }
        return response.status(400).json({
            "state": false,
            "message": "Error al actualizar"
            });
    }

    public async getStudent({params, response}:HttpContextContract){
        const user = await User.query().select('first_name','second_name','surname','second_sur_name',
        'type_document','document_number','email','phone').where('id','=',params.id_user,).andWhere('rol_id',2);
        if(user.length>0){
            response.status(200);
            return user;
        }        
        return response.status(400).json({
            "state": false,
            "message": "Error al consultar el detalle del usuario"
        });
    }

    public async delete({request, response}: HttpContextContract){
        try{
            const id = request.param('id_user');
            console.log(id)
            await User.query().select().where('id', id).delete();
            return response.status(200).json({
                "state": true,
                "message": "Usuario eliminado correctamente"
            })   
        }catch(error){
            
            console.log(error);
            return ({
                "state": false,
                "message": "Error al eliminar"
            });  
        }
        
    }
}
