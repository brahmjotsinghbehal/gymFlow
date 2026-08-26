//Global Declaration
let memberData = JSON.parse(localStorage.getItem("memberData")) || [];
let transactionData = JSON.parse(localStorage.getItem("transactionData")) || [];


//index html - Variables


const totalRevenue = document.getElementById("totalRevenue")
const totalExpense = document.getElementById("totalExpense")
const transactionModal = document.getElementById("transactionModal")
const memberModal = document.getElementById("memberModal")
const activeMemberCountDisplay = document.getElementById("activeMemberCountDisplay")
const dailyAttendanceCount = document.getElementById("dailyAttendanceCount")
const expiredMembershipModalDashboard = document.getElementById("expiredMembershipModalDashboard")
const expectedMembersCount = document.getElementById("expectedMembersCount")
const progressBarAttendance = document.getElementById("progressBarAttendance")
const followUpRequiredDashboard = document.getElementById("followUpRequiredDashboard")
const whatsappConfirmationModal = document.getElementById("whatsappConfirmationModal")



const addAttendanceCloseButton = document.getElementById("addAttendanceCloseButton").addEventListener("click" , ()=>{
    addAttendanceModalDashboard.close()
})

const addTransactionBtn = document.getElementById("addTransactionBtn").addEventListener("click" , ()=>{
    transactionModal.show();
})


const renewMember = document.getElementById("renewMember")
const expiredMembershipModalDashboardSearch = document.getElementById("expiredMembershipModalDashboardSearch").addEventListener("click",()=>{
    renewMembership()
})
const closeExpiredMembershipModalDashboard = document.getElementById("closeExpiredMembershipModalDashboard").addEventListener("click" , ()=>{
    expiredMembershipModalDashboard.close()
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
const renewMembershipBtn = document.getElementById("renewMembershipBtn").addEventListener("click" , ()=>{
    expiredMembershipModalDashboard.show()
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
    localStorage.setItem("transactionData",JSON.stringify(transactionData));
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
    let attendanceArray = []
    const member = {
        name : name.value.trim(),
        email : email.value,
        phone : phone.value,
        height : Number(height.value),
        weight : Number(weight.value),
        subscription : subscription,
        attendance : attendanceArray
    }
    if(name.value.trim() ===""){
        alert("Enter valid Name")
    }
    else if(!checkEmailAndPhone(email.value.trim(),phone.value)){
        alert("The user exists already exists with this email and phone number, please check")
    }
    else{
        memberData.push(member)
        localStorage.setItem("memberData" , JSON.stringify(memberData))
        memberModal.close()
        console.log(memberData)
        calculateActiveMembers()
        transactionData.push(transaction)
        localStorage.setItem("transactionData" , JSON.stringify(transactionData))
        displayTransactionDashboard()
        calculateTotalExpense()
        calculateTotalRevenue()

        whatsappConfirmationModal.open()
        const whatsappModalConfirmButton = document.getElementById("whatsappModalConfirmButton")
        whatsappModalConfirmButton.addEventListener("click" , ()=>{
            const phoneNumber = phone.value.trim();

            const date = new Date(startDate.value);

            const formattedDate = date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            });

            const message = `Hi ${name.value.trim()}, your gym membership has been successfully registered from ${formattedDate}.`;
            window.open(
                `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`,
                "_blank"
            );
            whatsappConfirmationModal.close()
        })

        const whatsappModalDeclineButton = document.getElementById("whatsappModalDeclineButton").addEventListener("click" , ()=>{
            whatsappConfirmationModal.close()
        })

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
    return activeMemberCount

}
function renewMembership() {
    const phone =
        document.getElementById("expiredMembershipDashboardSearch");
    const result =
        document.getElementById("expiredMembershipDashboardResult");
    result.innerHTML = "";
    let found = false;
    for (let i = 0; i < memberData.length; i++) {
        if (phone.value.trim() === memberData[i].phone) {
            const nameDisplay = document.createElement("h6");
            nameDisplay.innerText = memberData[i].name;
            const inputDisplay = document.createElement("select");
            const plans = [1, 2, 3, 6, 12];
            plans.forEach(month => {
                const option = document.createElement("option");
                option.value = month;
                option.textContent =
                    `${month} Month${month > 1 ? "s" : ""}`;
                inputDisplay.appendChild(option);
            });
            const paidRenewAmount = document.createElement("input")
            paidRenewAmount.type = "number"
            paidRenewAmount.placeholder = "Enter paid amount"
            result.appendChild(nameDisplay);
            result.appendChild(inputDisplay);
            result.appendChild(paidRenewAmount);
            renewMember.addEventListener("click",()=>{
                const amount = paidRenewAmount.value
                const transaction = {
                    id: transactionData.length + 1,
                    type: "income",
                    amount: Number(paidRenewAmount.value),
                    note: `Paid By ${memberData[i].name} Phone number ${memberData[i].phone}`,
                    date: new Date().toISOString().split("T")[0]
                }
                const months = Number(inputDisplay.value)
                const endDate = new Date(memberData[i].subscription.endDate)
                endDate.setMonth(endDate.getMonth() + months)
                memberData[i].subscription.endDate = endDate.toISOString().split("T")[0]
                transactionData.push(transaction)
                localStorage.setItem("transactionData" , JSON.stringify(transactionData))
                localStorage.setItem("memberData" , JSON.stringify(memberData))
                expiredMembershipModalDashboard.close()
                calculateActiveMembers();
                calculateTotalRevenue();
                calculateTotalExpense();
                displayTransactionDashboard();
            })
            found = true;
            break;
        }
    }

    if (!found) {
        result.innerText = "Not Found";
    }
    
}

const attendanceModalShow = document.getElementById("attendanceModalShow")
const addAttendanceModalDashboard = document.getElementById("addAttendanceModalDashboard")
const addAttendanceBtn = document.getElementById("addAttendanceBtn").addEventListener("click", ()=>{
    addAttendanceModalDashboard.show()
    const attendanceModalInput = document.getElementById("attendanceModalInput")
    attendanceModalInput.addEventListener("input",()=>{
        
        for(let i = 0;i<memberData.length;i++){
            if(attendanceModalInput.value.trim().length>0 && memberData[i].phone.startsWith(attendanceModalInput.value.trim())){
                attendanceModalShow.innerHTML=
                `<h3>${memberData[i].name}</h3>`
                const addAttendanceSaveButton = document.getElementById("addAttendanceSaveButton")

                addAttendanceSaveButton.addEventListener("click" , ()=>{
                    const date = new Date();
                    memberData[i].attendance.push(date.toISOString().split("T")[0])
                    localStorage.setItem("memberData" , JSON.stringify(memberData))
                    addAttendanceModalDashboard.close()
                    attendanceCount()
                    return 
                })

            }
            else if(attendanceModalInput.value.trim().length===0 && attendanceModalInput.value===""){
                attendanceModalShow.innerHTML=
                `Searching...`
            }
        }
    })
    
})

function attendanceCount() {

    let attendanceCountVar = 0
    let totalActiveMembers = calculateActiveMembers()

    const todayDate = new Date().toISOString().split("T")[0];

    for (let i = 0; i < memberData.length; i++) {

        const attendance = memberData[i].attendance || [];

        if (attendance.includes(todayDate)) {
            attendanceCountVar++;
        }

    }

    dailyAttendanceCount.innerHTML =
        `Present Today - ${attendanceCountVar} / ${totalActiveMembers}`;
    expectedMembersCount.innerHTML =
        `Expected Today - ${totalActiveMembers - attendanceCountVar}`;
    
    let progress = (attendanceCountVar / totalActiveMembers)*100
    progressBarAttendance.value = progress

}


function followUpRequiredDashboardResult(){
    followUpRequiredDashboard.innerText="EveryThing is up to date"
    const todayDate = new Date()
    for(let i = 0;i<memberData.length;i++){
        const date = new Date(memberData[i].subscription.endDate)
        
        if(todayDate>=date){
            const hello = document.createElement("div")
            hello.innerHTML = `${memberData[i].name}`
            followUpRequiredDashboard.append(hello)
        }
    }
}






followUpRequiredDashboardResult()
calculateActiveMembers();
calculateTotalRevenue();
calculateTotalExpense();
displayTransactionDashboard();
attendanceCount()
