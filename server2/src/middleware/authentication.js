import tokenHelper from '../helpers/token';

const authenticate = (req, res, next) => {
  const authHeaders = req.get('token');
  try {
    const decode = tokenHelper.decodeToken(authHeaders);
    req.tokenId = decode.id;
    req.tokenIsAdmin = decode.isAdmin;
    req.tokenEmail = decode.email;
    return next();
  } catch (err) {
    return res.status(403).json({
      status: 'error',
      error: 'not logged in',
    });
  }
};
export default authenticate;
