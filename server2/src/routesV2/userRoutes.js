import express from 'express';
import { signup, login } from '../controllersV2/userController';
import { schemas, validateInput } from '../helpers/validation';

const router = express.Router();

router.post('/signup', validateInput(schemas.authSchema), signup);
router.post('/signin', validateInput(schemas.authLogin), login);

export default router;
