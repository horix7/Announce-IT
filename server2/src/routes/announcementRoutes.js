import express from 'express';
import controller from '../controllers/announcementController';
import { schemas, validateInput } from '../helpers/validation';
import authenticate from '../middleware/authentication';

const router = express.Router();

router.post('/', authenticate, validateInput(schemas.announceSchema), controller.createAnnouncement);
router.patch('/:id/sold', authenticate, validateInput(schemas.updateAnnounce), controller.updateStatus);
router.patch('/:id', authenticate, validateInput(schemas.updateAnnounce), controller.updateAnnouncement);
router.delete('/:id', authenticate, controller.deleteAnnouncement);
router.get('/status', authenticate, controller.statusBasedAnnouncement);
router.get('/announcements', authenticate, controller.viewAnnouncements);
router.get('/myannouncements', authenticate, controller.myAnnouncements);
router.get('/:id', authenticate, controller.announcementDetails);
export default router;
