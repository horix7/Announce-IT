import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
class User{
    constructor(){
        this.users=[];
    }

    createUser(user){

        dotenv.config();
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
        
        const token=jwt.sign({email:user.email},process.env.PRIVATE_KEY);

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
               const token= jwt.sign({email:userExist.email},process.env.PRIVATE_KEY);
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