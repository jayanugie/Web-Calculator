/*key untuk mengakses dan menyimpan data pada localStorage*/
const CACHE_KEY = "calculation_history";

/*mengembalikan nilai boolean dari pengecekan fitur Storage pada browser
gunakan di dalam if statement setiap fungsi transaksi pada localStorage*/
function checkForStorage() {
    return typeof(Storage) !== "undefined"
   }

/*fungsi untuk menyimpan data riwayat kalkulasi pada localStorage*/
function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }                   //JSON.parse() untuk mengubah nilai objek string ke bentuk javascript
  
        historyData.unshift(data);   //unshift untukmenambahkan nilai baru pada array
  
        if (historyData.length > 5) {   //todal pernah lebih dari 5
            historyData.pop();     //pop  untuk menghapus nilai index terakhir pada array
        }
  
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }                                   //JSON.stringly() mengubah ke bentk string
 }
 
/*fungsi untuk mendapatkan data dari localStorage*/
 function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
 }

/*fungsi untuk merender data riwayat kalkulasi pada tabel HTML*/
function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");
    
    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";
    
    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";
  
  
        historyList.appendChild(row);
    }
 }


 renderHistory();