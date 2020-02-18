document.addEventListener("DOMContentLoaded", function(){
	var select = document.getElementById("24time");
    var startTime = moment().utc().set({hour:00,minute:00});
    var endTime = moment().utc().set({hour:23,minute:59});
    var timeStops = [];
    while(startTime <= endTime){
        timeStops.push(new moment(startTime).format('HH:mm'));
        startTime.add(20, 'minutes');
    }
   for (let i = 0; i < timeStops.length - 1; i++){
    let firstTime = timeStops[i];
    let secondTime = timeStops[i + 1];
    var opt = document.createElement("option");
    opt.textContent = firstTime + "-" + secondTime;
    opt.value = firstTime + "-" + secondTime;
    select.appendChild(opt);
    }
    var select2 = document.getElementById("12time");
    var startTime2 = moment().utc().set({hour:00,minute:00});
    var endTime2 = moment().utc().set({hour:23,minute:59});
    var timeStops2 = [];
    while(startTime2 <= endTime2){
        timeStops2.push(new moment(startTime2).format('hh:mm a'));
        startTime2.add(20, 'minutes');
    }
   for (let i = 0; i < timeStops2.length - 1; i++){
    let firstTime2 = timeStops2[i];
    let secondTime2 = timeStops2[i + 1];
    var opt2 = document.createElement("option");
    opt2.textContent = firstTime2 + "-" + secondTime2;
    opt2.value = firstTime2 + "-" + secondTime2;
    select2.appendChild(opt2);
    }
    document.getElementById("save").addEventListener("click", () => {
        var fld = document.getElementById("24time");
    var values = [];
    var count = 0;
    for (var i = 0; i < fld.options.length; i++) {
        if (fld.options[i].selected) {
            values.push(fld.options[i].value);
        }
    }
    console.log(values);
    });

});