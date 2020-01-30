import express from 'express';
import { announcementCreation, announcementUpdate } from '../controllersV2/announcementController';
import { schemas, validateInput } from '../helpers/validation';
import authenticate from '../middleware/authentication';

const router = express.Router();

router.post('/', authenticate, validateInput(schemas.announceSchema), announcementCreation);
router.patch('/:id', authenticate, validateInput(schemas.updateAnnounce), announcementUpdate);

export default router;
