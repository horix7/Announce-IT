import query from '../db/index';

const createAnnouncement = async (data, token) => {
  const queryText = `INSERT INTO 
  Announcements(text,status,owner,startDate,endDate)
  VALUES($1,$2,$3,$4,$5)
  RETURNING *`;
  const value = [data.text, data.status || 'pending', token, data.startDate, data.endDate];
  const result = await query.query1(queryText, value);
  return result;
};

const searchAnnouncement = async (id) => {
  const queryText = 'SELECT * FROM Announcements WHERE id=$1';
  const value = [id];
  const result = await query.query1(queryText, value);
  return result;
};
const updateAnnouncement = async (data, id) => {
  const queryText = 'UPDATE Announcements SET text=$1,startDate=$2,endDate=$3 WHERE id=$4';
  const announcement = await searchAnnouncement(id);
  const value = [
    data.text || announcement.rows[0].text,
    data.startDate || announcement.rows[0].startDate,
    data.endDate || announcement.rows[0].endDate,
    id,
  ];
  const result = await query.query1(queryText, value);
  return result;
};
const updateStatus = async (status, id) => {
  const announcement = await searchAnnouncement(id);
  const queryText = 'UPDATE Announcements SET status=$1 WHERE id=$2';
  const value = [status || announcement.rows[0].status, id];
  const result = await query.query1(queryText, value);
  return result;
};

export {
  createAnnouncement, searchAnnouncement, updateAnnouncement, updateStatus,
};
