const spinner = document.querySelector(".spin");
const myNumber = document.getElementById("myNumber");
const myResult = document.getElementById("myResult");
const SERVER_URL = `http://localhost:5050/fibonacci/${myNumber.value}`;
const button = document.getElementById("btnCalculator");

button.addEventListener("click", function() {
    spinner.classList.add("show");
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
    spinner.classList.remove("show");
    myResult.classList.add("show");
});