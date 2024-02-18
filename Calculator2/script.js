class Calculator {
    constructor(displayElement) {
        // The constructor is called when we create a new instance of the Calculator class.
        // It sets up the initial state of the calculator.
        
        this.displayElement = displayElement; // Store a reference to the display input element.
        this.clear(); // Initialize the calculator state by calling the clear method.
    }

    clear() {
        // This method resets the calculator to its default state.
        
        this.currentValue = ''; // Reset the current value to an empty string.
        this.previousValue = ''; // Reset the previous value to an empty string.
        this.operator = null; // Clear the operator.
        this.isNewInput = true; // Set the flag indicating a new number should start.
        this.updateDisplay(); // Update the display to reflect the cleared state.
    }

    delete() {
        // This method deletes the last character from the current input.
        
        if (this.isNewInput) return; // If isNewInput is true, do nothing (can't delete from a fresh input).
        this.currentValue = this.currentValue.slice(0, -1) || '0'; // Remove the last digit. If empty, default to '0'.
        this.updateDisplay(); // Update the display with the new current value.
    }

    appendNumber(number) {
        // This method appends a number or decimal point to the current input.
        
        if (this.isNewInput) {
            // If starting a new input, replace currentValue with the number pressed.
            this.currentValue = number.toString();
            this.isNewInput = false;
        } else if (number === '.' && this.currentValue.includes('.')) {
            // If the number is a decimal point and currentValue already has one, do nothing.
            return;
        } else {
            // Otherwise, append the number to currentValue.
            this.currentValue += number.toString();
        }
        this.updateDisplay(); // Update the display with the new current value.
    }

    chooseOperation(operation) {
        // This method sets the chosen operation (+, -, *, /) for the calculator.
        
        if (!this.isNewInput) {
            // If it's not a fresh input, append the operation to currentValue.
            this.currentValue += operation;
        } else {
            if (this.currentValue === '' && operation !== '-') {
                // If currentValue is empty and operation isn't minus, start with the operation.
                this.currentValue = operation;
            } else if (this.currentValue !== '') {
                // If currentValue is not empty, append the operation.
                this.currentValue += operation;
            }
            this.isNewInput = false; // It's no longer a new input.
        }
        this.updateDisplay(); // Update the display with the current value including the operation.
    }

    compute() {
        // This method performs the calculation based on the current and previous values and the operator.
        
        try {
            // Use eval to compute the result based on the current value string.
            let result = eval(this.currentValue);
            this.currentValue = result.toString(); // Convert the result back to a string and store it in currentValue.
            this.operator = null; // Clear the operator.
            this.previousValue = ''; // Clear previousValue.
            this.isNewInput = true; // Set the flag as the next input will start a new number.
            this.updateDisplay(); // Update the display with the result.
        } catch (error) {
            this.updateDisplay('Error'); // Display error if the computation fails.
            this.currentValue = ''; // Reset currentValue.
        }
    }

    updateDisplay(value = this.currentValue) {
        // This method updates the display with the current value or a provided value.
        
        this.displayElement.value = value; // Set the value of the display element to the provided value.
    }
}

// Now we will set up the event listeners for the calculator buttons.
// This will be done after the DOM content has been fully loaded.
// Further implementation of the Calculator class to handle button events.
document.addEventListener('DOMContentLoaded', () => {
    // This event listener waits for the content of the web page to load before running the code inside.

    const displayElement = document.querySelector('.display input');
    // document.querySelector selects the first element that matches the given CSS selector.
    // In this case, it selects the input element within the div with the class 'display'.

    const calculator = new Calculator(displayElement);
    // This line creates a new instance of the Calculator class, passing in the display element as a parameter.

    // Now we select all button elements using their CSS classes.
    const buttons = document.querySelectorAll('input[type=button]');
    // document.querySelectorAll returns a NodeList of all elements that match the given CSS selector.
    // Here, it selects all input elements of type button.

    for (const button of buttons) {
        // The for...of loop iterates over the NodeList of buttons.
        // For each button element, it executes the following function.

        button.addEventListener('click', () => {
            // addEventListener is a method that attaches an event handler to an element.
            // In this case, we're listening for a 'click' event on each button.

            if (button.classList.contains('number') || button.classList.contains('operator') || button.classList.contains('symbol')) {
                // If the button is a number, operator, or symbol, append its value to the current input.
                calculator.appendNumber(button.value);
            } else {
                switch (button.classList[0]) {
                    // The classList property returns a DOMTokenList of the class attributes of the element.
                    // We use the first class of each button to determine its function.
                    case 'ac':
                        calculator.clear();
                        // If the button has the class 'ac', call the clear method on the calculator instance.
                        break;
                    case 'del':
                        calculator.delete();
                        // If the button has the class 'del', call the delete method on the calculator instance.
                        break;
                    case 'equal':
                        calculator.compute();
                        // If the button has the class 'equal', call the compute method on the calculator instance.
                        break;
                }
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const displayElement = document.querySelector('.display input');
    const calculator = new Calculator(displayElement);5
    const buttons = document.querySelectorAll('input[type=button]');
    // Add this event listener to handle keyboard input1
    document.addEventListener('keydown', (event) => {3
        const { key } = event;
        if (key >= '0' && key <= '9') { // If the key is a number
            calculator.appendNumber(key);
        } else if (key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
            calculator.appendNumber(key); // For simplicity, using the same method for operators and decimal
        } else if (key === 'Enter' || key === '=') {
            calculator.compute();
        } else if (key === 'Backspace') {
            calculator.delete();
        } else if (key.toUpperCase() === 'C') { // Assuming 'C' is for clear
            calculator.clear();
        }
        // Prevent default action to avoid interfering with normal browser shortcuts
        event.preventDefault();
    });
});