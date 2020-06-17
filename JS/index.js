const btnCalculator = document.getElementById("btnCalculator");
const myNumber = document.getElementById("myNumber");
const myResult = document.getElementById("myResult");
const load = document.getElementById("load");
const loadResults = document.getElementById("loadResults");
const sortSelect = document.getElementById("sortSelect");
const errorMsg50 = document.getElementById("errorMsg50");
let receivedData;
let sortedData;
const resultsTable = document.getElementById("resultsTable");
const saveCalculationCheckBox = document.getElementById(
    "saveCalculationCheckBox"
);
const myModal = document.getElementById("myModal");
const myModalText = document.getElementById("myModalText");

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

// funtion to toggle display mode of an element
// function handleDisplay(element) {
//     if (element.style.display === "none") {
//         element.style.display = "block";
//     } else {
//         element.style.display = "none";
//     }
// }

function fibonacciFromServer() {
    if (myNumber.value > 50) handleLoader("none", "none", "block");
    else etchFibonacciServer();
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
                handleDisplay(load);
                handleDisplay(myResult);
                handleDisplay(errorMsg50);
                handleLoader("none", "block", "none");
                myResult.classList.remove("error-msg");
            } else if (typeof data === "string") {
                myResult.innerText = `Server Error: ${data}`;
                handleLoader("none", "block", "none");
                myResult.classList.add("error-msg");
                myModalText.innerText = data;
                $("#myModal").modal("show");
            }
        })
        .catch(function(error) {
            console.error(`Error`, error);
        });
}

function callPastResults() {
    loadResult.style.display = "block";
    let SERVER_URL = "http://localhost:5050/getFibonacciResults";
    fetch(SERVER_URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            loadResult.style.display = "none";
            receivedData = data.results;

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
        li.insertAdjacentHTML(
            "afterbegin",
            `The Fibonacci of <strong>${data[i].number}</strong> is <strong>${
        data[i].result
      }</strong> Calculated at ${new Date(data[i].createdDate)}`
        );
        resultsTable.appendChild(li);
    }
}

function sortedDataFromServer() {
    switch (sortSelect.value) {
        case "1":
            {
                sortedData = receivedData.sort((a, b) => a.number - b.number);
                showDataFromServer(sortedData);
                break;
            }
        case "2":
            {
                sortedData = receivedData.sort((a, b) => b.number - a.number);
                showDataFromServer(sortedData);
                break;
            }
        case "3":
            {
                sortedData = receivedData.sort((a, b) => a.createdDate - b.createdDate);
                showDataFromServer(sortedData);
                break;
            }
        case "4":
            {
                sortedData = receivedData.sort((a, b) => b.createdDate - a.createdDate);
                showDataFromServer(sortedData);
                break;
            }
        default:
            {
                sortedData = receivedData;
                showDataFromServer(sortedData);
            }
    }
}

document.onload = callPastResults();
btnCalculator.addEventListener("click", callFibonacciResult);
sortSelect.addEventListener("change", sortedDataFromServer);