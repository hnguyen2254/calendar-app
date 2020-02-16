document.addEventListener("DOMContentLoaded", function(){
    var startTime = moment().utc().set({hour:00,minute:00});
var endTime = moment().utc().set({hour:11,minute:59});

 var timeStops = [];

while(startTime <= endTime){
    timeStops.push(new moment(startTime).format('HH:mm'));
    startTime.add(15, 'minutes');
}
for (const val of a) {
    var opt = document.createElement("option");
    opt.textContent = val;
    opt.value = val;
    select.appendChild(opt);
}

    Date.prototype.toDateInputValue = (function(){
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });
   // if (document.getElementById("event").checked) {
      //  window.location = "event.html";
  //}
    document.getElementById("datePicker").value = new Date().toDateInputValue();
    document.getElementById("datePicker").min = new Date().toDateInputValue();
    var select = document.getElementById("24"); 
});