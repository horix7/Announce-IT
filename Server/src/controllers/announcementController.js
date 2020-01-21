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
        }else if(announcement=="not a user"){
            return res.status(403).json({
                "status":"error",
                "error":"user does not exist"
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
        }else if(result=="not a user"){
            return res.status(403).json({
                "status":"error",
                "error":"user does not exist"
            });
        }
        else{
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
        }else if(result=="not a user"){
            return res.status(403).json({
                "status":"error",
                "error":"user does not exist"
            });
        }
        else{
            return res.status(200).json({
                "status":"success",
                "data":result
            });
        }
    },
    deleteAnnouncement(req,res){
        const token={
            id:req.tokenId,
            email:req.tokenEmail,
            is_admin:req.tokenIs_admin
        };
        const result=AnnouncementModel.deleteAnnouncement(req.params.id,token);
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
        }else if(result=="not a user"){
            return res.status(403).json({
                "status":"error",
                "error":"user does not exist"
            });
        }
        else{
            return res.status(200).json({
                "status":"success",
                "data":result
            });
        }
    },
    viewAnnouncements(req,res){
        const token={
            id:req.tokenId,
            email:req.tokenEmail,
            is_admin:req.tokenIs_admin
        }; 
        const results=AnnouncementModel.viewAnnouncements(token);
        if(results=="no announcements"){
            return res.status(403).json({
                "status":"error",
                "error":"Announcement does not exist"
            });
        }
        else if(results=="not a user"){
            return res.status(403).json({
                "status":"error",
                "error":"you are not a user"
            });
        }
        else{
            return res.status(200).json({
                "status":"success",
                "data":results
            });
        }
    },
    announcementDetails(req,res){
        const token={
            id:req.tokenId,
            email:req.tokenEmail,
            is_admin:req.tokenIs_admin
        }
        const result=AnnouncementModel.announcementDetails(req.params.id,token);
        if(result=="not a user"){
            res.status(403).json({
                "status":"error",
                "error":"you are not a user"
            });
        }
        else if(result=="not found"){
            res.status(403).json({
                "status":"error",
                "error":"Announcement does not exists"
            });
        }else{
            return res.status(200).json({
                "status":"success",
                "data":result
            });  
        }
    },
    myAnnouncements(req,res){
        const token={
            id:req.tokenId,
            email:req.tokenEmail,
            is_admin:req.tokenIs_admin
        };
        const result=AnnouncementModel.myAnnouncements(token);
        if(result=="not found"){
            return res.status(403).json({
                "status":"error",
                "error":"you created no announcements"
            });
        }
        else if(result=="not a user"){
            return res.status(403).json({
                "status":"error",
                "error":"you are not a user"
            });   
        }
        else{
            return res.status(200).json({
                "status":"success",
                "data":result
            });
        }
    },
    statusAnnouncement(req,res){
        const token={
            id:req.tokenId,
            email:req.tokenEmail,
            is_admin:req.tokenIs_admin
        };
        console.log(req.query.status,"OKKKK");
        const result=AnnouncementModel.statusAnnouncement(req.query.status,token);
        if(result=="not a user"){
            return res.status(403).json({
                "status":"error",
                "error":"you are not a user"
            });
        }
        else if(result=="not found"){
            return res.status(403).json({
                "status":"error",
                "error":"No announcements with that status"
            });
        }
        else{
            return res.status(200).json({
                "status":"success",
                "error":result
            });
        }

    }

}
export default controller;