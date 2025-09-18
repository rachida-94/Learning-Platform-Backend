



My routers:



Api/auth/register : creates new user // you need inviteCode to register as teacher
api/auth/login :  user can log in

Exercise routes :
api/exercices : teacher gets all the exercises 
api/exercises/exercisesId : teacher can get the exercise by its Id

Submission routes

api/submissions : Student can get all his submissions 
api/submissions/exerciseId: Create submission  "exerciseId" and "answer"
api/submission/submissionId/grade : the teacher can grade and add feedback 

admin routes

api/admin/users : the admin get all the users

api/admin/users/userId/role : the admin can update the user role
api/admin/users/userId  : the admin can delete user
api/admin/exercises : the admin get all exercises
api/admin/exercises/exerciseId: the admin can delete specific exercise