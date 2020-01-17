var status=['accepted','declined','active','deactive'];
function hide(id){
    document.getElementById(id).remove();
}
function search(){
    
    // console.log(document.getElementById('srch'));
    if(document.getElementById('srch').value===""){
        document.getElementById('tbl').style.visibility="hidden";}
      
        else{
        document.getElementById('tbl').style.visibility="visible";
        }
}