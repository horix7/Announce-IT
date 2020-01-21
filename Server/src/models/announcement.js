import tokenHelper from '../helpers/token';
import {users} from './userdb';
import {announcements} from './announcementdb';
class Announcement{

    createAnnouncement(announcement,token){
        const checker=announcements.find((announce)=>announce.id==announcement.id);
        const user=users.find((us)=>us.id==token.id);
        if(user){
        if(checker){
            return "Announcement exists"
        }else{
            if(token.is_admin){
                return "admin"
            }else{
                console.log("URRRRRRR",token.id,token.is_admin);
            const announcement1={
                id:announcement.id,
                owner:token.id,
                status:announcement.status||"pending",
                text:announcement.text,
                start_date:announcement.start_date,
                end_date:announcement.end_date
            }
            announcements.push(announcement1);
            return announcement1;
        }}}
        else{
            return "not a user";
        }
    }
    updateAnnouncement(announcement,id,token){
        
        const checker=announcements.find((announce)=>announce.id==id);
        const index=announcements.indexOf(checker);
        const user=users.find((us)=>us.id==token.id);
        if(user){
        if(checker){
            if(token.is_admin){

                return "admin"
            }else{
             if(token.id==checker.owner) {
                 announcements[index].id=checker.id;
                 announcements[index].owner=checker.owner;
                 announcements[index].status=checker.status;
                 announcements[index].text=announcement.text||checker.text;
                 announcements[index].start_date=announcement.start_date||checker.start_date;
                 announcements[index].end_date=announcement.end_date||checker.end_date;

                 return announcements[index];
             }  
             else{
                 return "not the owner";
             }
            }
        }
        else{
            return "Not exists";
        }}
        else{
            return "not a user";
        }
    }
    updateStatus(announcement,id,token){

        const checker=announcements.find((announce)=>announce.id==id);
        const index=announcements.indexOf(checker);
        const user=users.find((us)=>us.id==token.id);
        if(user){
        if(checker){
        if(token.is_admin){
            announcements[index].id=checker.id;
            announcements[index].owner=checker.owner;
            announcements[index].status=announcement.status || checker.status;
            announcements[index].text=checker.text;
            announcements[index].start_date=checker.start_date;
            announcements[index].end_date=checker.end_date;

            return announcements[index];
        }
    else{
        return "not admin";
    }}
        else{
            return "Not exists";
        }
    }else{
        return "not a user";
    }
    }
    deleteAnnouncement(id,token){
        const checker=announcements.find((announce)=>announce.id==id);
        const index=announcements.indexOf(checker);
        const user=users.find((us)=>us.id==token.id);
        if(user){
        if(checker){
        if(token.is_admin){
           announcements.splice(index,1);
           return checker;
        }
    else{
        return "not admin";
    }}
        else{
            return "Not exists";
        }
    }
    else{
        return "not a user";
    }
}
viewAnnouncements(token){
    const user= users.find((us)=>us.id==token.id);
    if(user){
        if(announcements){
            return announcements;
        }else{
            return "no announcements";
        }
    }else{
        return "not a user";
    }
}
announcementDetails(id,token){
    const user=users.find((us)=>us.id==token.id);
    if(user){
        const announcement=announcements.find((announce)=>announce.id==id);
        if(announcement){
            return announcement;
        }else{
            return "not found";
        }
    }else{
        return "not a user";
    }
}
myAnnouncements(token){
    const user=users.find((us)=>us.id==token.id);
    const myAnnouncement=announcements.find((announce)=>announce.owner==user.id);
    if(user){
        if(myAnnouncement){
            return myAnnouncement;
        }
        else{
            return "not found";
        }
    }else{
        return "not a user";
    }
}
statusAnnouncement(status,token){
    const user=users.find((us)=>us.id==token.id);
    const announcement=announcements.find((announce)=>announce.status==status);

    if(user){
        if(announcement){
            return announcement;
        }
        else{
            return "not found";
        }
    }else{
        return "not a user";
    }
}
}
export default new Announcement();