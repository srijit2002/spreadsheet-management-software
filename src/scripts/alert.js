const alertCancelButton=document.getElementById("cancelAlertButton");
const alertBox=document.getElementById("alertBox");
const alertMessageBox=document.getElementById("messageContainer");
alertCancelButton.addEventListener("click",removeAlert);
function showAlert(message="some error occured"){
    alertMessageBox.innerText=message;
    if(alertBox.classList.contains("hide"))alertBox.classList.remove("hide");
}
function removeAlert(){
    if(!alertBox.classList.contains("hide"))alertBox.classList.add("hide");
}