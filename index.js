function noAnim(){
    if(location.href.includes("#noanim")){
        document.querySelectorAll('*').forEach(element=>{
            element.setAttribute("draggable","false");
            if(!element.hasAttribute("essential")){
                element.style.setProperty("animation-duration","0ms","important");
                element.style.setProperty("animation-delay","0ms","important");
            }
        })
    }
}
noAnim();
window.afterUpdComp.push(noAnim);