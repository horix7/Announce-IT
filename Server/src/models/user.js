import uuid from 'uuid';
class User{

    constructor(){
        this.users=[];
    }

    createUser(user){
        const userData={
            id:uuid.v4(),
            emal:user.emal,
            first_name:user.first_name,
            last_name:user.last_name,
            password:user.password,
            phoneNumber:user.phoneNumber,
            address:user.address,
            is_admin:user.is_admin
        };
        this.users.push(userData);
        return userData;
    }
}
export default new User();