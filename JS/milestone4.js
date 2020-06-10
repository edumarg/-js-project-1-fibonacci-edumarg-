const SERVER_URL = "http://localhost:5050/fibonacci/:number";

let button = document.getElementById("btnCalculator");

function getResultFromServer() {
    fetch(SERVER_URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const mynumber = document.getElementById("mynumber");
            const myresult = document.getElementById("myresult");
            mynumber.value = data.number;
            myresult.innerText = data.result;
        });
}