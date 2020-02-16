document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("dd1").style.visibility = "hidden";
    document.getElementById("dd2").style.visibility = "hidden";
    Date.prototype.toDateInputValue = (function(){
        let local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });
    document.getElementById("datePicker").addEventListener("change", function() {
        let input = this.value;
        let dateEntered = new Date(input);
        if (input == "2020-12-25" || input == "2021-01-01" || input == "2020-07-04"){
            alert("Sorry! Can't choose event date to be December 25, January 1, or July 4!");
        }
    });
    document.getElementById("datePicker").value = new Date().toDateInputValue();
    document.getElementById("datePicker").min = new Date().toDateInputValue();

    document.getElementById("24button").addEventListener("click", () => {
        document.getElementById("dd1").style.visibility = "visible";
        let select = document.getElementById("24");
        let startTime = moment().utc().set({hour:05,minute:00});
        let endTime = moment().utc().set({hour:23,minute:59});
        let timeStops = [];
        while(startTime <= endTime){
            timeStops.push(new moment(startTime).format('HH:mm'));
            startTime.add(20, 'minutes');
        }
        for (let i = 0; i < timeStops.length - 1; i++){
            let firstTime = timeStops[i];
            let secondTime = timeStops[i + 1];
            if (firstTime != "12:00" && firstTime != "12:20" && firstTime != "12:40"){
                let opt = document.createElement("option");
                opt.textContent = firstTime + "-" + secondTime;
                opt.value = firstTime + "-" + secondTime;
                select.appendChild(opt);
            }
        }
    });
    document.getElementById("12button").addEventListener("click", () => {
        document.getElementById("dd2").style.visibility = "visible";
        let select2 = document.getElementById("12");
        let startTime2 = moment().utc().set({hour:05,minute:00});
        let endTime2 = moment().utc().set({hour:23,minute:59});
        let timeStops2 = [];
        while(startTime2 <= endTime2){
            timeStops2.push(new moment(startTime2).format('hh:mm a'));
            startTime2.add(20, 'minutes');
        }
        for (let i = 0; i < timeStops2.length - 1; i++){
            let firstTime2 = timeStops2[i];
            let secondTime2 = timeStops2[i + 1];
            if (firstTime2 != "12:00 pm" && firstTime2 != "12:20 pm" && firstTime2 != "12:40 pm"){
                let opt2 = document.createElement("option");
                opt2.textContent = firstTime2 + "-" + secondTime2;
                opt2.value = firstTime2 + "-" + secondTime2;
                select2.appendChild(opt2);
            }
        }
    });
});