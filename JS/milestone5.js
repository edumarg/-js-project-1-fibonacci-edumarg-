let myNumber = document.getElementById("myNumber");
let myResult = document.getElementById("myResult");
let button = document.getElementById("btnCalculator");
let load = document.getElementById("load");
let errorMsg50 = document.getElementById("errorMsg50");

button.addEventListener("click", getFibonacciFromServer);

function getFibonacciFromServer() {
    if (myNumber.value > 50) {
        load.style.display = "none";
        myResult.style.display = "none";
        errorMsg50.style.display = "block";
        myResult.classList.remove("error-msg");
    } else if (myNumber.value <= 50) {
        let SERVER_URL = `http://localhost:5050/fibonacci/${myNumber.value}`;
        load.style.display = "block";
        myResult.style.display = "none";
        errorMsg50.style.display = "none";
        fetch(SERVER_URL)
            .then(function(response) {
                console.log(response);
                console.log(response.status);
                if (response.status === 200) {
                    return response.json();
                }
                if (response.status === 400) {
                    console.log(response.text);
                    return response.text();
                }
            })
            .catch(function(error) {
                console.error(`Error`, error);
            })
            .then(function(data) {
                if (typeof data === "object") {
                    console.log(data);
                    myResult.innerText = data.result;
                    load.style.display = "none";
                    myResult.style.display = "block";
                    errorMsg50.style.display = "none";
                } else if (typeof data === "string") {
                    console.log(data);
                    myResult.innerText = `Server Error: ${data}`;
                    load.style.display = "none";
                    myResult.style.display = "block";
                    errorMsg50.style.display = "none";
                    myResult.classList.add("error-msg");
                }
            });
    }
}