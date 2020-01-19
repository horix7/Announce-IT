import AnnouncementModel from '../models/announcement';

const controller={

    createAnnouncement(req,res){
        const token={
            id:req.tokenId,
            email:req.tokenEmail,
            is_admin:req.tokenIs_admin
        };
        const announcement=AnnouncementModel.createAnnouncement(req.body,token);
        if(announcement=="admin"){
            return res.status(401).json({
                "status":"error",
                "error":"You are not an advertiser"
            })
        }else{
        if(announcement=='Announcement exists'){
            return res.status(403).json({
                "status":"error",
                "error":"announcement exists"
            });
        }
        else{
            return res.status(201).json({
                "status":"success",
                "data":announcement
            });  
        }
    }}

}
export default controller;