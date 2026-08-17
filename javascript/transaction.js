let memberData = JSON.parse(localStorage.getItem("memberData")) || [];
let transactionData = JSON.parse(localStorage.getItem("transactionData")) || [];

const transactionHistoryContainer = document.getElementById("transactionHistoryContainer")

function displayTransactions(){
    transactionHistoryContainer.innerText=""
    let n=transactionData.length
    for(let i = n-1;i>=0;i--){
        const transactionListElement = document.createElement("li")
        transactionListElement.innerHTML=`Amount : ${transactionData[i].amount}  Type : ${transactionData[i].type} Note : ${transactionData[i].note} ` 
        transactionHistoryContainer.appendChild(transactionListElement)
    }
}
displayTransactions()