import tokenHelper from '../helpers/token'
class Announcement{
    constructor(){
        this.announcements=[];
    }
    createAnnouncement(announcement,token){
        const checker=this.announcements.find((announce)=>announce.id==announcement.id);
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
            this.announcements.push(announcement1);
            return announcement1;
        }}
    }
}
export default new Announcement();