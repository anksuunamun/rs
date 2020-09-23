function onButtonClick(arg) {
    //    document.getElementById("calculator-output").innerHTML += arg.innerHTML;
    let clickedButtonClass = arg.getAttribute('class')
    let MemoryCurrentNumber = 0;
    let MemoryNewNumber = false;
    let MemoryPendingOperation = '';

    function numberPress(number) {
        console.log(MemoryNewNumber)
        if (MemoryNewNumber) {
            document.getElementById("calculator-output").innerHTML = number;
            console.log(number)
            MemoryNewNumber = false;
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
        console.log(localOperationMemory)
        if (MemoryNewNumber && MemoryPendingOperation !== '=') {
            document.getElementById("calculator-output").innerHTML = MemoryCurrentNumber;
            console.log("da1")
        } else {
            MemoryNewNumber = true;
            if (MemoryPendingOperation === '+') {
                MemoryCurrentNumber += +localOperationMemory;
                console.log("da")
            } else if (MemoryPendingOperation === '-') {
                MemoryCurrentNumber -= +localOperationMemory;
            } else if (MemoryPendingOperation === '*') {
                MemoryCurrentNumber *= +localOperationMemory;
            } else if (MemoryPendingOperation === '/') {
                MemoryCurrentNumber /= +localOperationMemory;
            } else {
                MemoryCurrentNumber = +localOperationMemory;
            }
            document.getElementById("calculator-output").innerHTML = MemoryCurrentNumber;
            MemoryPendingOperation = op;
            console.log("da11")
            console.log(MemoryNewNumber)
        }
        
    }

    function clear(id) {
        if (id === 'AC') {
            document.getElementById("calculator-output").innerHTML = '0';
            MemoryNewNumber = true;
        } else if (id === 'DEL') {
            document.getElementById("calculator-output").innerHTML = document.getElementById("calculator-output").innerHTML.toString().slice(0, -1);
            MemoryNewNumber = true;
            MemoryCurrentNumber = 0;
            MemoryPendingOperation = '';
        }
    }

    if (clickedButtonClass === "default-button calculator__number-button") {
        numberPress(arg.innerHTML)
        console.log(arg.innerHTML)
    } else if (clickedButtonClass === "default-button calculator__operation-button") {
        operationPress(arg.innerHTML)
    } else if (clickedButtonClass === "default-button calculator__delete-button") {
        clear(arg.innerHTML)
    } else if (clickedButtonClass === "default-button calculator__all-clean-button") {
        clear(arg.innerHTML)
    } else if (clickedButtonClass === "default-button calculator__equal-button") {
        operationPress(arg.innerHTML)
    }
}