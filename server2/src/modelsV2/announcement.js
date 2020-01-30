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

export default createAnnouncement;
