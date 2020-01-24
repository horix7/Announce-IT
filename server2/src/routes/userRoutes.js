import express from 'express';
import userController from '../controllers/userController';
import controller from '../controllers/announcementController';
import { schemas, validateInput } from '../helpers/validation';

const router = express.Router();

router.post('/signup', validateInput(schemas.authSchema), userController.createUser);
router.post('/signin', userController.userLogin);
router.post('/announcement', validateInput(schemas.announceSchema), controller.createAnnouncement);

export default router;
