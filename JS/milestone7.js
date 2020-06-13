let myNumber = document.getElementById("myNumber");
let myResult = document.getElementById("myResult");
let button = document.getElementById("btnCalculator");
let load = document.getElementById("load");
let errorMsg50 = document.getElementById("errorMsg50");
let sortedData;
let saveCalculationCheckBox = document.getElementById(
    "saveCalculationCheckBox"
);

document.onload = callPastResults();
// if save claculation is not checek do following logic

button.addEventListener("click", callFibonacciResult);

function callFibonacciResult() {
    if (!saveCalculationCheckBox.checked) {
        printResult();
    } else if (saveCalculationCheckBox.checked) {
        getFibonacciFromServer();
        callPastResults();
    }
}

function fibonacciRecursion(index) {
    if (index < 2) return index; // Case for 0 and 1
    return fibonacciRecursion(index - 1) + fibonacciRecursion(index - 2); //case for 2 and bigger
}

function printResult() {
    return (myResult.innerText = fibonacciRecursion(myNumber.value));
}

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