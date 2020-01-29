import query from '../db/index';

const dropUsers = 'DROP TABLE IF EXISTS Users';
const dropAnnouncements = 'DROP TABLE IF EXISTS Announcements';

const drop = async () => {
  const tables = `${dropAnnouncements};${dropUsers}`;

  await query.query2(tables);
};
drop();
export default drop;
