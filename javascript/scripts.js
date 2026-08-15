//Global Declaration
let memberData = []
let transactionData= []

//index html - Variables
const totalRevenue = document.getElementById("totalRevenue")
const totalExpense = document.getElementById("totalExpense")
const transactionModal = document.getElementById("transactionModal")
const memberModal = document.getElementById("memberModal")
const activeMemberCountDisplay = document.getElementById("activeMemberCountDisplay")
const addTransactionBtn = document.getElementById("addTransactionBtn").addEventListener("click" , ()=>{
    transactionModal.show();
})
const closeTransactionModal = document.getElementById("closeTransactionModal").addEventListener("click" , ()=>{
    transactionModal.close();
})
const addMember = document.getElementById("addMember").addEventListener("click" , ()=>{
    memberModal.show()
})
const closeMemberModal = document.getElementById("closeMemberModal").addEventListener("click" , ()=>{
    memberModal.close();
})
const saveTransaction = document.getElementById("saveTransaction").addEventListener("click" , ()=>{
    const amount = Number(document.getElementById("transactionAmount").value)
    const type = document.getElementById("transactionType").value
    const note = document.getElementById("transactionNote").value.trim()
    const transaction = {
        id: transactionData.length + 1,
        type: type,
        amount: amount,
        note: note,
        date: new Date().toISOString().split("T")[0]
    };
    
    transactionData.push(transaction)
    calculateTotalRevenue()
    calculateTotalExpense()
    transactionModal.close()
    displayTransactionDashboard()
})

const saveMember = document.getElementById("saveMember").addEventListener("click" , ()=>{
    const name = document.getElementById("memberName")
    const email = document.getElementById("memberEmail")
    const phone = document.getElementById("memberPhone")
    const height = document.getElementById("memberHeight")
    const weight = document.getElementById("memberWeight")
    const type = document.getElementById("memberSubscriptionType")
    const startDate = document.getElementById("memberStartDate")
    const memberPaidAmount = document.getElementById("memberPaidAmount")
    const start = new Date(startDate.value)
    const endDate = new Date(start);
    endDate.setMonth(endDate.getMonth()+ Number(type.value))

    const transaction = {
        id: transactionData.length + 1,
        type: "income",
        amount: Number(memberPaidAmount.value),
        note: `Paid By ${name.value} Phone number ${phone.value}`,
        date: new Date().toISOString().split("T")[0]
    };
    const subscription = {
        type : type.value,
        startDate : startDate.value,
        endDate : endDate.toISOString().split("T")[0]
    }
    const member = {
        name : name.value.trim(),
        email : email.value,
        phone : phone.value,
        height : Number(height.value),
        weight : Number(weight.value),
        subscription : subscription
    }
    if(name.value.trim() ===""){
        alert("Enter valid Name")
    }
    else if(!checkEmailAndPhone(email.value.trim(),phone.value)){
        alert("The user exists already exists with this email and phone number, please check")
    }
    else{
        memberData.push(member)
        memberModal.close()
        console.log(memberData)
        calculateActiveMembers()
        transactionData.push(transaction)
        displayTransactionDashboard()
        calculateTotalExpense()
        calculateTotalRevenue()
        name.value = ""
        email.value = ""
        phone.value =""
        height.value =""
        weight.value=""
        memberPaidAmount.value=""
        startDate.value=""
    }


})

//index html - Functions

function displayTransactionDashboard(){
    const displayTransactionDashboard = document.getElementById("displayTransactionDashboard")
    displayTransactionDashboard.innerHTML = ""
    const lastIndex = transactionData.length-1;
    for(let i = 0 ;i<(Math.min(9,transactionData.length));i++){
        const transactions = document.createElement('li')
        transactions.classList.add("displayTransactionDashboardElements")
        transactions.textContent =
            `${transactionData[lastIndex-i].type} ₹${transactionData[lastIndex-i].amount} ${transactionData[lastIndex-i].note}`;
        displayTransactionDashboard.appendChild(transactions)
    }
}

function checkEmailAndPhone(email , phone){
    for(let i=0;i < memberData.length ; i++){
        if(email===memberData[i].email){
            return false;
        }
        else if(phone===memberData[i].phone){
            return false;
        }
    }
    return true;
} 

function calculateTotalRevenue(){
    let revenue = 0;
    for(let i = 0;i<transactionData.length;i++){
        if(transactionData[i].type==="income"){
            revenue+=transactionData[i].amount
        }
    }
    totalRevenue.innerHTML=`₹${revenue}`
}

function calculateTotalExpense(){
    let expense = 0;
    for(let i = 0;i<transactionData.length;i++){
        if(transactionData[i].type==="expense"){
            expense+=transactionData[i].amount
        }
    }
    totalExpense.innerHTML=`₹${expense}`
}

function calculateActiveMembers(){
    let activeMemberCount=0;
    activeMemberCountDisplay.innerHTML=""
    const date = new Date().toISOString().split("T")[0]
    for(let i = 0;i<memberData.length;i++){
        if(memberData[i].subscription.endDate >= date){
            activeMemberCount++;
        }
    }
    activeMemberCountDisplay.innerHTML = activeMemberCount

}   


calculateActiveMembers()