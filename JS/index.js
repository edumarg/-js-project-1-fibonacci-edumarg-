let myNumber = document.getElementById("myNumber");
let myResult = document.getElementById("myResult");
let button = document.getElementById("btnCalculator");
let load = document.getElementById("load");
let sortSelect = document.getElementById("sortSelect");
let errorMsg50 = document.getElementById("errorMsg50");
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
            let receivedData = data.results;
            for (let i = 0; i < Object.keys(receivedData).length; i++) {
                let li = document.createElement("li");
                li.classList.add("list-group-item");
                li.innerHTML = `The Fibonacci of <strong>${
          receivedData[i].number
        }</strong> is <strong>${
          receivedData[i].result
        }</strong> Calculated at ${new Date(receivedData[i].createdDate)}`;
                resultsTable.appendChild(li);
            }
        });

    //old function with sort
    //.then(function(data) {
    //     let receivedData = data.results;
    //     sortedData = receivedData.sort((a, b) => b.createdDate - a.createdDate);
    // let lastResults = [];
    // for (let i = 0; i < 4; i++) {
    //         lastResults.push(
    //             `The Fibonacci of ${sortedData[i].number} is ${
    //     sortedData[i].result
    //   } Calculated at ${Date(sortedData[i].createdDate)}`
    //         );
    //     }
    //     firstLineResults.innerText = lastResults[0];
    //     secondLineResults.innerText = lastResults[1];
    //     thirdLineResults.innerText = lastResults[2];
    // })
    // .catch(function(error) {
    //     console.error(`Error`, error);
    // });
}

function sortedDataFromServer(data) {
    if (sortSelect.value === 1) {
        sortedData = data.sort((a, b) => a.number - b.number);
    } else if (sortSelect === 2) {
        sortedData = data.sort((a, b) => b.number - a.number);
    } else if (sortSelect === 3) {
        sortedData = data.sort((a, b) => a.createdDate - b.createdDate);
    } else if (sortSelect === 4) {
        sortedData = data.sort((a, b) => b.createdDate - a.createdDate);
    } else {
        sortedData = data;
    }
    console.log("sorted data", data);
    return data;
}

document.onload = callPastResults();
button.addEventListener("click", callFibonacciResult);
// sortSelect.addEventListener("change");