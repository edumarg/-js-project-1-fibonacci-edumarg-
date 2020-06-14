let myNumber = document.getElementById("myNumber");
let myResult = document.getElementById("myResult");
let button = document.getElementById("btnCalculator");
let load = document.getElementById("load");
let errorMsg50 = document.getElementById("errorMsg50");
let sortedData;

function getFibonacciFromServer() {
    if (myNumber.value > 50) {
        load.style.display = "none";
        myResult.style.display = "none";
        errorMsg50.style.display = "block";
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
                    myResult.classList.remove("error-msg");
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

function callPastResults() {
    let SERVER_URL = "http://localhost:5050/getFibonacciResults";
    fetch(SERVER_URL)
        .then(function(response) {
            console.log("milestone6", response);
            return response.json();
        })
        .catch(function(error) {
            console.error(`Error`, error);
        })
        .then(function(data) {
            let receivedData = data.results;
            sortedData = receivedData.sort((a, b) => b.createdDate - a.createdDate);
            let lastResults = [];
            for (let i = 0; i < 4; i++) {
                lastResults.push(
                    // `The Fibonacci of ${sortedData[i].number} is ${sortedData[i].result} Calculated at ${sortedData[i].createdDate}`
                    `The Fibonacci of ${sortedData[i].number} is ${
            sortedData[i].result
          } Calculated at ${Date(sortedData[i].createdDate)}`
                );
            }
            firstLineResults.innerText = lastResults[0];
            secondLineResults.innerText = lastResults[1];
            thirdLineResults.innerText = lastResults[2];
        });
}

button.addEventListener("click", getFibonacciFromServer);
document.onload = callPastResults();
button.addEventListener("click", callPastResults);