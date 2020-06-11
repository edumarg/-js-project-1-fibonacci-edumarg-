let myNumber = document.getElementById("myNumber");
let myResult = document.getElementById("myResult");
const SERVER_URL = `http://localhost:5050/fibonacci/${myNumber.value}`;
let button = document.getElementById("btnCalculator");
let load = document.querySelector(".load");

button.addEventListener("click", function() {
    load.classList.add("show");
    myResult.classList.remove("show");
    fetch(SERVER_URL)
        .then(function(response) {
            console.log(response);
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

myResult.addEventListener("load", function() {
    load.classList.remove("show");
    myResult.classList.add("show");
});