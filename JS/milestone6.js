let myNumber = document.getElementById("myNumber");
let myResult = document.getElementById("myResult");
let button = document.getElementById("btnCalculator");
let load = document.getElementById("load");
let errorMsg50 = document.getElementById("errorMsg50");
let sortedData;

button.addEventListener("click", getFibonacciFromServer);
document.onload = callPastResults();
button.addEventListener("click", callPastResults);

function getFibonacciFromServer() {
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
                    console.error(`Error`, error);
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
            console.log("milestone6 data", data);
            let receivedData = data.results;
            sortedData = receivedData.sort((a, b) => b.createdDate - a.createdDate);
            let lastResults = [];
            console.log("sorted data", sortedData);
            for (let i = 0; i < 4; i++) {
                lastResults.push(
                    // `The Fibonacci of ${sortedData[i].number} is ${sortedData[i].result} Calculated at ${sortedData[i].createdDate}`
                    `The Fibonacci of ${sortedData[i].number} is ${
            sortedData[i].result
          } Calculated at ${Date(sortedData[i].createdDate)}`
                );
            }
            console.log("last results", lastResults);
            firstLineResults.innerText = lastResults[0];
            secondLineResults.innerText = lastResults[1];
            thirdLineResults.innerText = lastResults[2];
        });
}