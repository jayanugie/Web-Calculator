console.log("Selamat Anda berhasil menggunakan JavaScript pada Website")

/*membuat objek untuk menyimpan data dan kondisi pada kalkulator*/
const calculator = {
    displayNumber: '0',           //angka yg muncul pada layar kalkulator diambil dari code 'calculator.displayNumeber'
    operator: null,             
    firstNumber: null,
    waitingForSecondNumber: false   //kalkulator sedang menunggu pengguna menentukkan angka kedua
};

/*membuat FUNGSI-FUNGSI umum kalkulator*/

//update angka pada layar
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

//menghapus data pada layar
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

//memasukkan angka ke dalam display
function inputDigit(digit) {
    calculator.displayNumber += digit;
}

/*menggantikan 0 pada angka pertama */
function inputDigit(digit) {
    if(calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

//fungsi inverseNumber 
function inverseNumber() {
    if(calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

//fungsi + -
function handleOperator(operator) {
    if(!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        //mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka perama lagi
        calculator.displayNumber = '0';
        } else {
            alert('Operator sudah diterapkan')
        }
    }

//fungsi performCalculation
function performCalculation() {
    if(calculator.firstNumber == null || null) {    //pengecekan nilai-nilai yg dibutuhkan
        alert("Anda belum menetapkan operator");
        return;
    }

    let result = 0;
    if(calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber); //parseInt untuk mengubah string menjadi number
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }

   // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

//EVENT HANDLER
/*menambah variable buttons dengan event click*/
const buttons = document.querySelectorAll(".button");
for(let button of buttons) {
    button.addEventListener('click', function(event) {

        //mendapatkan objek elemen yang diklik
        const target = event.target;

        /*event.classList untuk melihat nilai class apa saja dalam bentuk array yang ada pada element target, 
        kemudian menggunakan contains() yang merupakan method dari array yang berguna untuk memastikan nilai yang 
        terkandung di dalam array tersebut.*/

        if(target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if(target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if(target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if(target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }


        inputDigit(target.innerText);
        updateDisplay()
    });
}


