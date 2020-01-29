import express from 'express';
import signup from '../controllersV2/userController';
import { schemas, validateInput } from '../helpers/validation';

const router = express.Router();

router.post('/signup', validateInput(schemas.authSchema), signup);

export default router;
