/* eslint-disable no-console */
import {
  createAnnouncement, searchAnnouncement, updateAnnouncement, updateStatus,
} from '../modelsV2/announcement';
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
const announcementUpdate = async (req, res) => {
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
  const exist = await searchAnnouncement(req.params.id);
  if (exist.rowCount === 0) {
    return res.status(403).json({
      status: 'error',
      error: 'announcement does not exists',
    });
  }
  if (exist.rows[0].owner !== userExists.rows[0].id) {
    return res.status(403).json({
      status: 'error',
      error: 'you are not the owner',
    });
  }
  const announcement = await updateAnnouncement(req.body, req.params.id);
  return res.status(200).json({
    status: 'success',
    data: announcement.rows[0],
  });
};
const announcementStatusUpdate = async (req, res) => {
  const userExists = await userExist(req.tokenEmail);
  if (userExists.rowCount === 0) {
    return res.status(403).json({
      status: 'error',
      error: 'User does not exist',
    });
  }
  const admin = await isAdmin(req.tokenEmail);
  if (admin.rowCount === 0) {
    return res.status(403).json({
      status: 'error',
      error: 'Not admin',
    });
  }
  const exist = await searchAnnouncement(req.params.id);
  if (exist.rowCount === 0) {
    return res.status(403).json({
      status: 'error',
      error: 'announcement does not exists',
    });
  }
  const updatedAnnouncement = await updateStatus(req.body.status, req.params.id);
  if (updatedAnnouncement.rowCount > 0) {
    return res.status(200).json({
      status: 'success',
      data: updatedAnnouncement.rows[0],
    });
  }
};
const announcementSearch = async (req, res) => {
  const userExists = await userExist(req.tokenEmail);
  if (userExists.rowCount === 0) {
    return res.status(403).json({
      status: 'error',
      error: 'User does not exist',
    });
  }
  const exist = await searchAnnouncement(req.params.id);
  if (exist.rowCount === 0) {
    return res.status(403).json({
      status: 'error',
      error: 'announcement does not exists',
    });
  }
  return res.status(200).json({
    status: 'success',
    data: exist.rows[0],
  });
};
export {
  announcementCreation, announcementUpdate, announcementStatusUpdate, announcementSearch,
};
