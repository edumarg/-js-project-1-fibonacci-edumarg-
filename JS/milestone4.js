const myNumber = document.getElementById("myNumber");
const myResult = document.getElementById("myResult");
const SERVER_URL = `http://localhost:5050/fibonacci/${myNumber.value}`;
const button = document.getElementById("btnCalculator");

button.addEventListener("click", function() {
    fetch(SERVER_URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            myResult.innerText = data.result;
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
});