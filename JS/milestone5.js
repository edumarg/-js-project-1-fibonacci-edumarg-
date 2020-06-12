let myNumber = document.getElementById("myNumber");
let myResult = document.getElementById("myResult");
let button = document.getElementById("btnCalculator");
let load = document.getElementById("load");
let errorMsg50 = document.getElementById("errorMsg50");

button.addEventListener("click", function() {
    if (myNumber.value > 50) {
        load.style.display = "none";
        myResult.style.display = "none";
        errorMsg50.style.display = "block";
        errorMsg42.style.display = "none";
        errorMsg0.style.display = "none";
    } else if (myNumber.value <= 50) {
        if (myNumber.value == 42) {
            load.style.display = "none";
            myResult.style.display = "none";
            errorMsg50.style.display = "none";
            errorMsg42.style.display = "block";
            errorMsg0.style.display = "none";
        } else if (myNumber.value <= 0) {
            load.style.display = "none";
            myResult.style.display = "none";
            errorMsg42.style.display = "none";
            errorMsg50.style.display = "none";
            errorMsg0.style.display = "block";
        } else {
            let SERVER_URL = `http://localhost:5050/fibonacci/${myNumber.value}`;
            load.style.display = "block";
            myResult.style.display = "none";
            errorMsg42.style.display = "none";
            errorMsg50.style.display = "none";
            errorMsg0.style.display = "none";
            fetch(SERVER_URL)
                .then(function(response) {
                    console.log(response);
                    return response.json();
                })
                .catch(function(error) {
                    console.error(`Error ${myNumber.value}:`, error);
                })
                .then(function(data) {
                    console.log(data);
                    myResult.innerText = data.result;
                    load.style.display = "none";
                    myResult.style.display = "block";
                    errorMsg42.style.display = "none";
                    errorMsg50.style.display = "none";
                    errorMsg0.style.display = "none";
                });
        }
    }
});