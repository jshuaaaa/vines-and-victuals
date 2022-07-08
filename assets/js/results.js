var homeicon =document.querySelector(".fa.fa-home")
var bookicon =document.querySelector(".fas.fa-bookmark")

homeicon.addEventListener("click", goHome);

function goHome(){
    window.location.assign("../../index.html")
}