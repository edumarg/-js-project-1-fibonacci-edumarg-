function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//--Milestone 2 --//
function fibonacci(index) {
    fibonacciSeq = [0, 1];
    for (i = 2; i <= index; i++) {
        fibonacciSeq.push(fibonacciSeq[i - 1] + fibonacciSeq[i - 2]);
    }
    return fibonacciSeq[index];
}

function milestone2() {
    milestone2Text = document.getElementById("milestone2");
    fibonacciIndex = getRndInteger(0, 20);
    milestone2Text.innerText = `The fibonacci of ${fibonacciIndex} is ${fibonacci(
    fibonacciIndex
  )}`;
}

milestone2();