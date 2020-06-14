let myNumber = document.getElementById("myNumber");
let myResult = document.getElementById("myResult");
let button = document.getElementById("btnCalculator");

button.addEventListener("click", getFibonacciFromServer);

function getFibonacciFromServer() {
    let SERVER_URL = `http://localhost:5050/fibonacci/${myNumber.value}`;
    fetch(SERVER_URL)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            myResult.innerText = data.result;
            console.log("my result", myResult.innerText);
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
}