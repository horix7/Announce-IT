import express from 'express';
import {
  announcementCreation,
  announcementUpdate,
  announcementStatusUpdate,
  announcementSearch,
  viewAnnouncements,
  viewMyAnnouncements,
  announcementSearchStatus,
} from '../controllersV2/announcementController';
import { schemas, validateInput } from '../helpers/validation';
import authenticate from '../middleware/authentication';

const router = express.Router();

router.post('/', authenticate, validateInput(schemas.announceSchema), announcementCreation);
router.patch('/:id/sold', authenticate, validateInput(schemas.updateAnnounce), announcementStatusUpdate);
router.patch('/:id', authenticate, validateInput(schemas.updateAnnounce), announcementUpdate);
router.get('/status', authenticate, announcementSearchStatus);
router.get('/announcements', authenticate, viewAnnouncements);
router.get('/myannouncements', authenticate, viewMyAnnouncements);
router.get('/:id', authenticate, announcementSearch);

export default router;
