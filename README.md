
Learning Platform Backend
This is the backend API for a multi role learning platform built with Node.js, Express, and MongoDB. It supports secure authentication, role based access control, and CRUD operations for exercises and submissions

Required Dependencies:  express /mongoose/ bcrypt / jsonwebtoken / dotenv /cors


Create a .env file in the root of the backend folder with the following variables:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
INVITE_CODE_TEACHER=your_teacher_invite_code
  
// Postman to test my routes 
// Also have seed.js (fake data) to test my routes
Auth Routes:


POST Api/auth/register : creates new user // you need inviteCode to register as teacher
POST api/auth/login :  user can log in

Teacher Routes:

GET api/exercices                        // teacher gets all the exercises 
GET api/exercises/exercisesId            // teacher can get the exercise by its Id
POST api/submission/submissionId/grade   // teacher can grade and add feedback 
DELETE api/exercises/exercisesId         // teacher can delete the exercises she owns



admin routes

GET    /api/admin/users                   // Get all users
PUT    /api/admin/users/:userId/role      // Update a user's role
DELETE /api/admin/users/:userId           // Delete a user

GET    /api/admin/exercises               // Get all exercises
DELETE /api/admin/exercises/:exerciseId   // Delete a specific exercise

GET    /api/admin/submissions             // Get all submissions
DELETE /api/admin/submissions/:submissionId   // Delete a specific submission




this repo for my frontend : https://github.com/rachida-94/Learning-Platform-Frontend.git
