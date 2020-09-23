const numbers = document.querySelectorAll('.calculator__number-button');
const operations = document.querySelectorAll('.calculator__operation-button');
const all_clean_btn = document.querySelector('.calculator__all-clean-button');
const del_btn = document.querySelector('.calculator__delete-button')
const decimal_btn = document.querySelector('.calculator__decimal-button');


for (let number of numbers) {
    number.addEventListener('click', (e) => {
        numberPress(e.target.textContent)
    })
}

for (let operation of operations) {
    operation.addEventListener('click', (e) => {
        operationPress(e.target.textContent)
    })
}
all_clean_btn.addEventListener('click', (e) => {
    clear(e.target.textContent)
    if (incorrectInputData) {
        for (let number of numbers) {
            number.setAttribute('disabled', null)
            number.classList.remove('default-button_disabled_true')
        }
        for (let operation of operations) {
            operation.setAttribute('disabled', null)
            operation.classList.remove('default-button_disabled_true')
        }
        del_btn.setAttribute('disabled', null)
        del_btn.classList.remove('default-button_disabled_true')
        decimal_btn.setAttribute('disabled', null)
        decimal_btn.classList.remove('default-button_disabled_true')
        incorrectInputData = false;
    }

})
del_btn.addEventListener('click', (e) => {
    clear(e.target.textContent);
})

decimal_btn.addEventListener('click', (e) => {
    decimal(e.target.textContent);
})


let MemoryCurrentNumber = 0;
let MemoryNewNumber = false;
let MemoryPendingOperation = '';
let incorrectInputData = false;
let shouldAddMinus = false;
let decimalPlaces = 0;

function numberPress(number) {
    if (MemoryNewNumber) {
        document.getElementById("calculator-output").innerHTML = shouldAddMinus ? number * (-1) : number;
        MemoryNewNumber = false;
        shouldAddMinus = false;
    } else {
        if (document.getElementById("calculator-output").innerHTML === '0') {
            document.getElementById("calculator-output").innerHTML = number;
        } else {
            document.getElementById("calculator-output").innerHTML += number;
        }
    }
}

function operationPress(op) {
    let localOperationMemory = document.getElementById("calculator-output").innerHTML;
    if (MemoryNewNumber && MemoryPendingOperation !== '=') {
        if (op === '-') {
            shouldAddMinus = true
        }
        document.getElementById("calculator-output").innerHTML = MemoryCurrentNumber;
    } else {
        if (op === 'SQRT') {
            if ((+localOperationMemory) >= 0) {
                MemoryCurrentNumber = Math.sqrt(+localOperationMemory)
                document.getElementById("calculator-output").innerHTML = MemoryCurrentNumber;
            } else {
                document.getElementById("calculator-output").innerHTML = 'Введены неверные данные'
                for (let number of numbers) {
                    number.setAttribute('disabled', true)
                    number.classList.add('default-button_disabled_true')
                }
                for (let operation of operations) {
                    operation.setAttribute('disabled', true)
                    operation.classList.add('default-button_disabled_true')
                }
                del_btn.setAttribute('disabled', true)
                del_btn.classList.add('default-button_disabled_true')
                decimal_btn.setAttribute('disabled', true)
                decimal_btn.classList.add('default-button_disabled_true')
                incorrectInputData = true;
            }
        } else {
            MemoryNewNumber = true;
            isDecimal(+localOperationMemory)
            if (MemoryPendingOperation === '+') {
                isDecimal(+localOperationMemory);
                MemoryCurrentNumber += +localOperationMemory;
            } else if (MemoryPendingOperation === '-') {
                isDecimal(+localOperationMemory);
                MemoryCurrentNumber -= +localOperationMemory;
            } else if (MemoryPendingOperation === '*') {
                isDecimal(+localOperationMemory, true);
                MemoryCurrentNumber *= +localOperationMemory;
            } else if (MemoryPendingOperation === '/') {
                isDecimal(+localOperationMemory, true);
                MemoryCurrentNumber /= +localOperationMemory;
            } else if (MemoryPendingOperation === 'POW') {
                MemoryCurrentNumber = Math.pow(MemoryCurrentNumber, +localOperationMemory)

            } else {
                MemoryCurrentNumber = +localOperationMemory;
            }
            if (MemoryCurrentNumber === Math.trunc(MemoryCurrentNumber)) {
                document.getElementById("calculator-output").innerHTML = MemoryCurrentNumber.toFixed(0)
            }
            else {
                document.getElementById("calculator-output").innerHTML = MemoryCurrentNumber.toFixed(decimalPlaces);
            }
            MemoryPendingOperation = op;
        }
    }
}

function clear(action) {
    if (action === 'AC') {
        document.getElementById("calculator-output").innerHTML = '0';
        MemoryNewNumber = true;
        MemoryCurrentNumber = 0;
        MemoryPendingOperation = '';
        decimalPlaces = 0;
    } else if (action === 'DEL') {
        if (decimalPlaces !== 0) {
            decimalPlaces -= 1;
        }
        document.getElementById("calculator-output").innerHTML = document.getElementById("calculator-output").innerHTML.toString().slice(0, -1);
    }
}

function decimal() {
    let localDecimalMemory = document.getElementById("calculator-output").innerHTML;

    if (MemoryNewNumber) {
        localDecimalMemory = '0.';
        MemoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }
    document.getElementById("calculator-output").innerHTML = localDecimalMemory;
}

function isDecimal(number, isMulti) {
    if (number !== Math.trunc(number) && !isMulti) {
        let currentDecimalPlaces = String((number - Math.trunc(number))).split(".")[1].length;
        if (decimalPlaces < currentDecimalPlaces) {
            decimalPlaces = currentDecimalPlaces
        }
    }
    else if (number !== Math.trunc(number) && isMulti) {
        decimalPlaces += String((number - Math.trunc(number))).split(".")[1].length;
    }
}
