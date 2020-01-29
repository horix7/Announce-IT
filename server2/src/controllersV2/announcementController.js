/* eslint-disable no-console */
import createAnnouncement from '../modelsV2/announcement';
import { userExist, isAdmin } from '../modelsV2/user';

const announcementCreation = async (req, res) => {
  const userExists = await userExist(req.tokenEmail);
  if (userExists.rowCount === 0) {
    return res.status(403).json({
      status: 'error',
      error: 'User does not exist',
    });
  }

  const admin = await isAdmin(req.tokenEmail);
  if (admin.rowCount > 0) {
    return res.status(403).json({
      status: 'error',
      error: 'Not advertiser',
    });
  }
  const announcement = await createAnnouncement(req.body, req.tokenId);
  if (announcement.rowCount > 0) {
    return res.status(201).json({
      status: 'success',
      data: announcement.rows[0],
    });
  }
};

export default announcementCreation;
