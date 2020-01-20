var status=['accepted','declined','active','deactive'];
function hide(id){
    document.getElementById(id).remove();
}
function details(){
    document.getElementById('more').style.visibility='visible';
}
function closed(){
        document.getElementById('more').style.visibility="hidden";
     
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