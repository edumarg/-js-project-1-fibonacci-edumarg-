function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//-- Milestone 1 - Fibonacci-- //
function milestone1() {
    let milestone1Text = document.getElementById("milestone1");
    let fibonacciIndex = getRndInteger(0, 10);
    let fibonacciSeq = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
    milestone1Text.innerText = `The fibonacci of ${fibonacciIndex} is ${fibonacciSeq[fibonacciIndex]}`;
}

milestone1();