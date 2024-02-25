function appendToDisplay(value) {
    document.getElementsByName('display')[0].value += value;
}

function clearDisplay() {
    document.getElementsByName('display')[0].value = '';
}

function deleteLast() {
    const display = document.getElementsByName('display')[0];
    display.value = display.value.slice(0, -1);
}

// Function to evaluate the expression and catch errors like invalid operations
function calculateResult() {
    try {
        const display = document.getElementsByName('display')[0];
        display.value = eval(display.value);
    } catch (error) {
        alert("Invalid expression");
        clearDisplay();
    }
}


