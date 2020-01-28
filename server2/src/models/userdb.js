import bcrypt from 'bcrypt';

let pass = '200';
pass = bcrypt.hashSync(pass, 10);
const users = [{
  id: 1,
  firstName: 'ukundwa',
  lastName: 'dia',
  email: 'dia@gmail.com',
  address: 'kamembe',
  password: pass,
  phoneNumber: '0780000092',
  isAdmin: true,
},
{
  id: 2,
  firstName: 'tuy',
  lastName: 'eric',
  email: 'eric@gmail.com',
  address: 'kamembe',
  password: pass,
  phoneNumber: '078229862',
  isAdmin: false,
},
{
  id: 3,
  firstName: 'ira',
  lastName: 'vivi',
  email: 'vivi@gmail.com',
  address: 'kamembe',
  password: pass,
  phoneNumber: '0782237192',
  isAdmin: false,
},
{
  id: 4,
  firstName: 'turi',
  lastName: 'Eli',
  email: 'eli@gmail.com',
  address: 'kamembe',
  password: pass,
  phoneNumber: '078874592',
  isAdmin: false,
}];

export default users;
