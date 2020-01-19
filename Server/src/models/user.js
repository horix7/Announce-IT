import bcrypt from 'bcrypt';
import tokenHelper from '../helpers/token';
class User{
    constructor(){
        this.users=[];
    }

    createUser(user){

        const userAvailable = this.users.find((us)=>us.id==user.id);
        if(userAvailable){
            return "That id exists";
        }else{
         
        const user_exist= this.users.find((us)=>us.email==user.email);

        if(user_exist){
            return "user exists";
        }
        else{
        const hashed=bcrypt.hashSync(user.password,10);
        const data={
            id:user.id,
            email:user.email,
            first_name:user.first_name,
            last_name:user.last_name,
            password:hashed,
            phoneNumber:user.phoneNumber,
            address:user.address,
            is_admin:user.is_admin
        };
        this.users.push(data);
        
        const token= tokenHelper.encodeToken({"email":data.email,"id":data.id,"is_admin":data.is_admin});

        return {
            data:data,
            token:token
        };
    }   
}
}
    login(user){
        const userExist= this.users.find((us)=>us.email==user.email);
        
        if(userExist){

           if( bcrypt.compareSync(user.password,userExist.password)){
               const token= tokenHelper.encodeToken({"email":userExist.email,"id":userExist.id,"is_admin":userExist.is_admin});
               return {
                   user:userExist,
                   token:token
               };
           }
           else{
               return "incorrect password"
           }
        }else{
            return "Does not exist";
        }
    }
}
export default new User();