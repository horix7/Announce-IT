import express from 'express';
import announcementCreation from '../controllersV2/announcementController';
import { schemas, validateInput } from '../helpers/validation';
import authenticate from '../middleware/authentication';

const router = express.Router();

router.post('/', authenticate, validateInput(schemas.announceSchema), announcementCreation);

export default router;
