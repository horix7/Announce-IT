import tokenHelper from '../helpers/token'

const authenticate=(req,res,next)=>{
    const auth_headers=req.get("token");
    try{
    const decode=tokenHelper.decodeToken(auth_headers);
    req.tokenId=decode.id;
    req.tokenIs_admin=decode.is_admin;
    req.tokenEmail=decode.email;
    next();
    }catch(err){
        return res.status(403).json({
            "status":"error",
            "error":"not logged in"
        });
    }
}
export default authenticate;