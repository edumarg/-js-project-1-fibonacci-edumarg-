let myNumber = document.getElementById("myNumber");
let myResult = document.getElementById("myResult");
let button = document.getElementById("btnCalculator");
let load = document.getElementById("load");
let sortSelect = document.getElementById("sortSelect");
let errorMsg50 = document.getElementById("errorMsg50");
let receivedData;
let sortedData;
let resultsTable = document.getElementById("resultsTable");
let saveCalculationCheckBox = document.getElementById(
    "saveCalculationCheckBox"
);

function callFibonacciResult() {
    myResult.classList.remove("error-msg");
    handleLoader("none", "none", "none");
    if (!saveCalculationCheckBox.checked) {
        fibonacciInternal();
    } else if (saveCalculationCheckBox.checked) {
        fibonacciFromServer();
        callPastResults();
    }
}

function fibonacciRecursion(index) {
    if (index < 2) return index; // Case for 0 and 1
    return fibonacciRecursion(index - 1) + fibonacciRecursion(index - 2); //case for 2 and bigger
}

function fibonacciInternal() {
    handleLoader("none", "block", "none");
    return (myResult.innerText = fibonacciRecursion(myNumber.value));
}

function handleLoader(display1, display2, display3) {
    load.style.display = display1;
    myResult.style.display = display2;
    errorMsg50.style.display = display3;
}

function fibonacciFromServer() {
    if (myNumber.value > 50) {
        handleLoader("none", "none", "block");
    } else if (myNumber.value <= 50) {
        fetchFibonacciServer();
    }
}

function fetchFibonacciServer() {
    let SERVER_URL = `http://localhost:5050/fibonacci/${myNumber.value}`;
    handleLoader("block", "none", "none");
    fetch(SERVER_URL)
        .then(function(response) {
            console.log(response);
            if (response.status === 200) {
                return response.json();
            }
            if (response.status === 400) {
                return response.text();
            }
        })
        .then(function(data) {
            if (typeof data === "object") {
                myResult.innerText = data.result;
                handleLoader("none", "block", "none");
                myResult.classList.remove("error-msg");
            } else if (typeof data === "string") {
                myResult.innerText = `Server Error: ${data}`;
                handleLoader("none", "block", "none");
                myResult.classList.add("error-msg");
            }
        })
        .catch(function(error) {
            console.error(`Error`, error);
        });
}

function callPastResults() {
    let SERVER_URL = "http://localhost:5050/getFibonacciResults";
    fetch(SERVER_URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            receivedData = data.results;
            // showDataFromServer(receivedData);
            sortedDataFromServer();
        })
        .catch(function(error) {
            console.error(`Error`, error);
        });
}

function showDataFromServer(data) {
    resultsTable.innerHTML = "";
    for (let i = 0; i < Object.keys(data).length; i++) {
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `The Fibonacci of <strong>${
      data[i].number
    }</strong> is <strong>${data[i].result}</strong> Calculated at ${new Date(
      data[i].createdDate
    )}`;
        resultsTable.appendChild(li);
    }
}

function sortedDataFromServer() {
    if (sortSelect.value == 1) {
        sortedData = receivedData.sort((a, b) => a.number - b.number);
    } else if (sortSelect.value == 2) {
        sortedData = receivedData.sort((a, b) => b.number - a.number);
    } else if (sortSelect.value == 3) {
        sortedData = receivedData.sort((a, b) => a.createdDate - b.createdDate);
    } else if (sortSelect.value == 4) {
        sortedData = receivedData.sort((a, b) => b.createdDate - a.createdDate);
    } else {
        sortedData = receivedData;
    }
    showDataFromServer(sortedData);
}

document.onload = callPastResults();
button.addEventListener("click", callFibonacciResult);
sortSelect.addEventListener("change", sortedDataFromServer);