//--Milestone 3--//
function fibonacci(index) {
    fibonacciSeq = [0, 1];
    for (i = 2; i <= index; i++) {
        fibonacciSeq.push(fibonacciSeq[i - 1] + fibonacciSeq[i - 2]);
    }
    return fibonacciSeq[index];
}

let mynumber = document.getElementById("mynumber");
let myResult = document.getElementById("myResult");
let button = document.getElementById("btnCalculator");

function printResult() {
    return (myResult.innerText = fibonacciRecursion(mynumber.value));
}

button.addEventListener("click", function() {
    return (myResult.innerText = fibonacciRecursion(mynumber.value));
});

//--Milestone 3.1 Geekout--
function fibonacciRecursion(index) {
    if (index < 2) return index; // Case for 0 and 1
    return fibonacciRecursion(index - 1) + fibonacciRecursion(index - 2); //case for 2 and bigger
}