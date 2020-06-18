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
    else fetchFibonacciServer();
}

async function fetchFibonacciServer() {
    handleLoader("block", "none", "none");
    const SERVER_URL = `http://localhost:5050/fibonacci/${myNumber.value}`;
    const response = await fetch(SERVER_URL); // await for the fetch before continuing
    let data = await response; //awaits for the response bofore continuing
    //Check status and epending of the status copy the json or text.
    if (data.status === 200) {
        data = await response.json();
    } else if (data.status === 400) {
        data = await response.text();
    } else {
        myModalText.innerText = `HTTP error! status: ${response.status}`;
        $("#myModal").modal("show");
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Determine type of data to display the correct one (the number or text)
    if (typeof data === "object") {
        myResult.innerText = data.result;
        handleLoader("none", "block", "none");
        myResult.classList.remove("error-msg");
    } else if (typeof data === "string") {
        myResult.innerText = `Server Error: ${data}`;
        handleLoader("none", "block", "none");
        myResult.classList.add("error-msg");
        myModalText.innerText = data;
        $("#myModal").modal("show");
    }
}

async function callPastResults() {
    handleLoader("block", "none", "none");
    loadResult.style.display = "block";
    const SERVER_URL = "http://localhost:5050/getFibonacciResults";
    response = await fetch(SERVER_URL); // await for the fetch before continuing
    //catch error
    if (!response.ok) {
        handleLoader("none", "none", "none");
        myModalText.innerText = `HTTP error! status: ${response.status}`;
        $("#myModal").modal("show");
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        data = await response.json(); //await for the response
        loadResult.style.display = "none";
        handleLoader("none", "block", "none");
        receivedData = data.results;
        sortedDataFromServer();
    }
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