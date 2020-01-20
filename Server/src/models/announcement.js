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
    updateAnnouncement(announcement,id,token){
        
        const checker=this.announcements.find((announce)=>announce.id==id);
        const index=this.announcements.indexOf(checker);
        if(checker){
            if(token.is_admin){

                return "admin"
            }else{
             if(token.id==checker.owner) {
                 this.announcements[index].id=checker.id;
                 this.announcements[index].owner=checker.owner;
                 this.announcements[index].status=checker.status;
                 this.announcements[index].text=announcement.text||checker.text;
                 this.announcements[index].start_date=announcement.start_date||checker.start_date;
                 this.announcements[index].end_date=announcement.end_date||checker.end_date;

                 return this.announcements[index];
             }  
             else{
                 return "not the owner";
             }
            }
        }
        else{
            return "Not exists";
        }
    }
    updateStatus(announcement,id,token){

        const checker=this.announcements.find((announce)=>announce.id==id);
        const index=this.announcements.indexOf(checker);
        if(checker){
        if(token.is_admin){
            this.announcements[index].id=checker.id;
            this.announcements[index].owner=checker.owner;
            this.announcements[index].status=announcement.status || checker.status;
            this.announcements[index].text=checker.text;
            this.announcements[index].start_date=checker.start_date;
            this.announcements[index].end_date=checker.end_date;

            return this.announcements[index];
        }
    else{
        return "not admin";
    }}
        else{
            return "Not exists";
        }
    }
    deleteAnnouncement(id,token){
        const checker=this.announcements.find((announce)=>announce.id==id);
        const index=this.announcements.indexOf(checker);
        if(checker){
        if(token.is_admin){
           this.announcements.splice(index,1);
           return checker;
        }
    else{
        return "not admin";
    }}
        else{
            return "Not exists";
        }
    }
}
export default new Announcement();