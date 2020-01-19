import express from 'express';
import controller from '../controllers/announcementController';
import {schemas,validateInput} from '../helpers/validation';
import authenticate from '../middleware/authentication';

const router = express.Router();

router.post('/',authenticate,validateInput(schemas.announceSchema),controller.createAnnouncement)

export const announceRouter=router;