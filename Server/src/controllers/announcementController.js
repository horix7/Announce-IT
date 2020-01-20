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
    }},
    updateAnnouncement(req,res){
        const token={
            id:req.tokenId,
            email:req.tokenEmail,
            is_admin:req.tokenIs_admin
        };
        const result=AnnouncementModel.updateAnnouncement(req.body,req.params.id,token);
        if(result == "admin"){
            return res.status(401).json({
                "status":"error",
                "error":"You are not advertiser"
            });
        }else if(result=="not the owner"){
            return res.status(401).json({
                "status":"error",
                "error":"You are not the owner"
            });
        }
        else if(result=="Not exists"){
            return res.status(403).json({
                "status":"error",
                "error":"Announcement does not exist"
            });
        }else{
            return res.status(200).json({
                "status":"success",
                "data":result
            });
        }
    },
    updateStatus(req,res){
        const token={
            id:req.tokenId,
            email:req.tokenEmail,
            is_admin:req.tokenIs_admin
        };
        const result=AnnouncementModel.updateStatus(req.body,req.params.id,token);
        if(result == "not admin"){
            return res.status(401).json({
                "status":"error",
                "error":"You are not admin"
            });
        }
        else if(result=="Not exists"){
            return res.status(403).json({
                "status":"error",
                "error":"Announcement does not exist"
            });
        }else{
            return res.status(200).json({
                "status":"success",
                "data":result
            });
        }
    }

}
export default controller;