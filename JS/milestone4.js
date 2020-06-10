const SERVER_URL = "http://localhost:5050/fibonacci/:number";

let button = document.getElementById("btnCalculator");

function getResultFromServer() {
    fetch(SERVER_URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const number = document.getElementById("milestone4Index");
            const result = document.getElementById("milestone4Result");
            number.value = data.number;
            result.innerText = data.result;
        });
}