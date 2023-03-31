/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world Admin Calificacion de Profesores - reto final' }
})

Route.group(() =>{
  Route.post("/login","UsersController.login");
}).prefix("/api/v1")

Route.group(() =>{
  Route.get("/form/getquestions","FormsController.getQuestions");
  Route.post("/form/postquestions","FormsController.saveForm");
  
Route.group(() =>{
  
  Route.post("/create-role","RolesController.create");
  Route.post("/create-type-document","TypeDocumentsController.create");
  Route.post("/create-admin","UsersController.createAdmin");

  Route.post("/user/create","UsersController.create");
  Route.get("/user/getUsers","UsersController.getStudentList");
  Route.put("/user/update/:id_user","UsersController.update");
  Route.get("/user/getUser/:id_user","UsersController.getStudent");
  Route.delete("/user/delete/:id_user","UsersController.delete")

  Route.post("/questions/create","QuestionsController.create");
  Route.get("/questions/getQuestions","QuestionsController.getQuestions");
  Route.delete("/questions/deleteQuestion/:id_question","QuestionsController.delete");
  Route.put("/questions/updateQuestion/:id_question","QuestionsController.update");

  Route.put("/questions/updateAnswer/:id_option","AnswersController.update");
  Route.get("/questions/getOptions/:id_question","AnswersController.optionList");
}).middleware("admin")
 
}).prefix("/api/v1").middleware("auth")
//-----------------------------------------------------------------------------------------


