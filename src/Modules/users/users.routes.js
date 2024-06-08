// 4- Implement routes and controllers for user registration, login, 
// and logout. (email must be unique)
import { Router } from 'express';
const router = Router();
import * as usersController from './users.controllers.js'; 

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/logout', usersController.logout);

router.get('/get/:id', usersController.getUserWithPostAndComments);

export default router;