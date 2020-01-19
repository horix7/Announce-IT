import express from 'express';
import userController from '../controllers/userController';
import {schemas,validateInput} from '../helpers/validation';

const router = express.Router();

router.post('/signup',validateInput(schemas.authSchema),userController.createUser);
router.post('/signin',validateInput(schemas.authSchema),userController.userLogin);

export const routers=router;
