let memberData = JSON.parse(localStorage.getItem("memberData")) || [];
let transactionData = JSON.parse(localStorage.getItem("transactionData")) || [];
const authStatus = localStorage.getItem("authStatus");

if (authStatus === "false") {
    window.location.href = "login.html";
    alert("Make sure to login")
}

const transactionHistoryContainer = document.getElementById("transactionHistoryContainer")

function displayTransactions(){
    transactionHistoryContainer.innerText=""
    let n=transactionData.length
    for(let i = n-1;i>=0;i--){
        const transactionListElement = document.createElement("li")
        const deleteButton = document.createElement("button")
        deleteButton.innerText = "Delete"
        transactionListElement.innerHTML=`Amount : ${transactionData[i].amount}  Type : ${transactionData[i].type} Note : ${transactionData[i].note} `
        deleteButton.addEventListener("click" , ()=>{
            transactionData.splice(i,1)
            localStorage.setItem("transactionData",JSON.stringify(transactionData))
            displayTransactions()
        }) 
        transactionHistoryContainer.appendChild(transactionListElement)
        transactionHistoryContainer.appendChild(deleteButton)
    }
}
displayTransactions()