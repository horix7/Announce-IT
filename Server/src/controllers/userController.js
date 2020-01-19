import userModel from '../models/user';
const userController = {

    createUser(req,res){
        
       const user=userModel.createUser(req.body);
       res.status(201).send(user);
    }
}
export default userController