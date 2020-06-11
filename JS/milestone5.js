let myNumber = document.getElementById("myNumber");
let myResult = document.getElementById("myResult");
let button = document.getElementById("btnCalculator");
let load = document.querySelector(".load");

button.addEventListener("click", function() {
    let SERVER_URL = `http://localhost:5050/fibonacci/${myNumber.value}`;
    load.style.display = "block";
    myResult.style.display = "none";

    // load.classList.add("show");
    // myResult.classList.remove("show");
    fetch(SERVER_URL)
        .then(function(response) {
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            myResult.innerText = data.result;
            load.style.display = "none";
            myResult.style.display = "block";
        })
        .catch(function(error) {
            console.error("Error:", error);
        });
});