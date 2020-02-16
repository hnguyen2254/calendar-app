document.addEventListener("DOMContentLoaded", function(){
     document.getElementById("event").addEventListener("click", () => {
        window.location = "event.html";
    });
     var events = document.getElementById("events");
        //temp = parameters[1].split("=");
        //p = unescape(temp[1]);
        var newEvent = document.createElement("li");
        newEvent.innerHTML = window.location.search;
         events.appendChild(newEvent);
    //newEvent.textContent = ;
   // newEvent.value = firstTime2 + "-" + secondTime2;
   
});