var status=['accepted','declined','active','deactive'];
function hide(id){
    document.getElementById(id).remove();
}
function search(){
    
    // console.log(document.getElementById('srch'));
    if(document.getElementById('srch').value===""){
        document.getElementById('tbl').style.visibility="hidden";}
        else if((document.getElementById('srch').value)==="active"){
            document.getElementById('tbl').style.visibility="hidden";
            document.getElementById('tbl1').style.visibility="visible"; 
            document.getElementById('tbl2').style.visibility="hidden";
            document.getElementById('tbl3').style.visibility="hidden"; 
            document.getElementById('tbl4').style.visibility="hidden";  
            }
            else if((document.getElementById('srch').value)==="accepted"){
            
            document.getElementById('tbl2').style.visibility="visible";
            document.getElementById('tbl').style.visibility="hidden";
            document.getElementById('tbl1').style.visibility="hidden"; 
            document.getElementById('tbl3').style.visibility="hidden"; 
            document.getElementById('tbl4').style.visibility="hidden";    
                }
                else if((document.getElementById('srch').value)==="deactive"){
            
            document.getElementById('tbl3').style.visibility="visible";
            document.getElementById('tbl').style.visibility="hidden";
            document.getElementById('tbl1').style.visibility="hidden"; 
            document.getElementById('tbl2').style.visibility="hidden";
            document.getElementById('tbl4').style.visibility="hidden";    
                    }
                    else if((document.getElementById('srch').value)==="declined"){
            
                        document.getElementById('tbl4').style.visibility="visible";
                        document.getElementById('tbl').style.visibility="hidden";
                        document.getElementById('tbl1').style.visibility="hidden"; 
                        document.getElementById('tbl2').style.visibility="hidden";
                        document.getElementById('tbl3').style.visibility="hidden";      
                        }
        else{
        document.getElementById('tbl').style.visibility="visible";
        document.getElementById('tbl3').style.visibility="hidden";
        document.getElementById('tbl1').style.visibility="hidden"; 
        document.getElementById('tbl2').style.visibility="hidden";
        document.getElementById('tbl4').style.visibility="hidden";  
        }
}
function login(){
    if((document.getElementById('email').value === "ugizwenayodiny@gmail.com") && (document.getElementById('psswd').value==="JULIA")){
        
        
        location.replace("../HTML/view-all-announcements-page.html")
    }
    else if(document.getElementById('email').value === "" && document.getElementById('psswd').value===""){
        location.replace("../HTML/login-page.html")
    }
    else{
        location.replace("../HTML/create-announcement-page.html")
        
    }
}