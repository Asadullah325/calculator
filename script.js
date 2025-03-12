$(document).ready(function() {
    let currentInput = '';
    let resultField = $('#result');
 
    $('.number').on('click', function() {
        currentInput += $(this).text();
        resultField.val(currentInput);
    });

    
 
    $('.operator').on('click', function() {
        const operator = $(this).text();
        if (/[+\-*/.%]$/.test(currentInput)) return;
        currentInput += operator;
        resultField.val(currentInput);
    });

    $('.clear').on('click', function() {
        currentInput = '';
        resultField.val('');
    });

    $('.delete').on('click', function() {
        currentInput = currentInput.slice(0, -1);
        resultField.val(currentInput);
    });

    $('.equals').on('click', function() {
        try {
            const result = compute(currentInput);
            resultField.val(result);
            currentInput = result.toString();
        } catch (error) {
            resultField.val('Error');
            currentInput = '';
        }
    });

    function compute(input) {
        const operators = [];
        const numbers = [];
        let currentNumber = '';

        for (let i = 0; i < input.length; i++) {
            const char = input[i];

            if (/\d|\./.test(char)) {
                currentNumber += char; 
            } else if (/[+\-*/.%]/.test(char)) {
                if (currentNumber === '') throw new Error('Invalid input');
                numbers.push(parseFloat(currentNumber));
                operators.push(char);
                currentNumber = ''; 
            }
        }

        if (currentNumber !== '') numbers.push(parseFloat(currentNumber));

        
        for (let i = 0; i < operators.length; i++) {
            if (operators[i] === '*' || operators[i] === '/' || operators[i] === '%') {
                const result = operate(numbers[i], numbers[i + 1], operators[i]);
                numbers.splice(i, 2, result);
                operators.splice(i, 1);
                i--; 
            }
        }

        for (let i = 0; i < operators.length; i++) {
            const result = operate(numbers[i], numbers[i + 1], operators[i]);
            numbers.splice(i, 2, result);
            operators.splice(i, 1);
            i--;
        }

        return numbers[0];
    }

    function operate(a, b, operator) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b === 0) throw new Error('Division by zero');
                return a / b;
            case '%':
                return a % b;
            default:
                throw new Error('Unknown operator');
        }
    }
});
