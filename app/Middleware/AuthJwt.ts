import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from 'App/Controllers/Http/UsersController'

export default class AuthJwt {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const authorizationHeader = ctx.request.header('authorization')
    console.log(authorizationHeader)
    if(authorizationHeader == undefined){
      return ctx.response.status(400).send({
        message: "no autorization"
      })
    }
    try{
      const usersController = new UsersController()
      usersController.verifyToken(authorizationHeader);
      await next()
    }catch(error){
      console.log(error)
      console.log("falla relacionada con el token")
    }
    
  }
}
