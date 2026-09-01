let memberData = JSON.parse(localStorage.getItem("memberData")) || [];
let transactionData = JSON.parse(localStorage.getItem("transactionData")) || [];
const authStatus = localStorage.getItem("authStatus");

if (authStatus === "false") {
    window.location.href = "login.html";
    alert("Make sure to login")
}
const memberFilterValue = document.getElementById("memberFilterValue")
const memberSearchInput = document.getElementById("memberSearchInput")
const memberContainer = document.getElementById("memberContainer")
const memberEditModal = document.getElementById("memberEditModal")
const memberInfoDisplayModal = document.getElementById("memberInfoDisplayModal")

memberSearchInput.addEventListener("input",()=>{
    const temp = memberSearchInput.value.trim()
    console.log(memberSearchInput.value);
    let searchArray = []
    for(let i=0;i<memberData.length;i++){
        if(memberData[i].phone.includes(temp)){
            searchArray.push(i)
        }
    }
    if(temp===""){
        memberDisplay()
    }
    else if(searchArray.length===0){
        const memberContainer=document.getElementById("memberContainer")
        memberContainer.innerHTML="No member exists..."
    }
    else{
        memberDisplaySearch(searchArray)
    }
})
const memberRemoveFilterBtn=document.getElementById("memberRemoveFilterBtn").addEventListener("click", ()=>{
    memberDisplay()
    memberFilterValue.value = "all"
})
const memberApplyFilterBtn=document.getElementById("memberApplyFilterBtn")
memberApplyFilterBtn.addEventListener("click" , ()=>{
    
    memberContainer.innerHTML=""
    if(memberFilterValue.value==="all"){
        memberDisplay()
        return 
    }
    const todayDate = new Date().toISOString().split("T")[0]
    
    for(let i=0;i<memberData.length;i++){
        const endDate = memberData[i].subscription.endDate
        if(memberFilterValue.value==="expired" && todayDate>endDate){
            memberContainer.appendChild(makeMemberDisplayCard(i))
        }
        if(memberFilterValue.value==="active" && todayDate<=endDate){
            memberContainer.appendChild(makeMemberDisplayCard(i))
        }
    }
})
function memberDisplaySearch(temp){
    const memberContainer=document.getElementById("memberContainer")
    memberContainer.innerHTML=""
    for(let i=0;i<temp.length;i++){
        memberContainer.appendChild(makeMemberDisplayCard(temp[i]))
    }
}
function memberDisplay(){
    const memberContainer=document.getElementById("memberContainer")
    memberContainer.innerHTML=""
    for(let i = 0;i<memberData.length;i++){
        memberContainer.appendChild(makeMemberDisplayCard(i))
    }
}
function makeMemberDisplayCard(i) {
    const memberDetailsContainer = document.createElement("div");
    const memberDeleteButton = document.createElement("button")
    const memberEditButton = document.createElement("button")
    const memberDetailsButton = document.createElement("button")
    memberDeleteButton.innerHTML = "Delete"
    memberEditButton.innerHTML = "Edit"
    memberDetailsButton.innerHTML = "Details"
    memberDetailsButton.addEventListener("click", () => {
        const member = memberData[i]
        const today = new Date()
        const endDate = new Date(member.subscription.endDate)
        const timeRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
        const memberTransactions = transactionData.filter(transaction => transaction.note.includes(member.phone))
        const recentTransaction = memberTransactions[memberTransactions.length - 1]
        let status = ""
        let remainingMessage = ""
        if(timeRemaining >= 0){
            status = "Active"
            remainingMessage = `${timeRemaining} days remaining`
        }
        else{
            status = "Expired"
            remainingMessage = `${Math.abs(timeRemaining)} days ago`
        }
        memberInfoDisplayModal.innerHTML = `
        <div>
            <h2>${member.name}</h2>
            <p>Name: ${member.name}</p>
            <p>Email: ${member.email}</p>
            <p>Phone: ${member.phone}</p>
            <p>Height: ${member.height} cm</p>
            <p>Weight: ${member.weight} kg</p>
            <h3>Membership</h3>
            <p>Plan: ${member.subscription.type} months</p>
            <p>Start Date: ${member.subscription.startDate}</p>
            <p>End Date: ${member.subscription.endDate}</p>
            <p>Status: ${status}</p>
            <p>${remainingMessage}</p>
            <h3>Attendance</h3>
            <p>Total Attendance: ${member.attendance.length}</p>
            <p>Last Attendance: ${member.attendance.length > 0 ? member.attendance[member.attendance.length - 1] : "No attendance yet"}</p>
            <h3>Recent Transaction</h3>
            <p>Amount: ${recentTransaction.amount}</p>
            <p>Type: ${recentTransaction.type}</p>
            <p>Date: ${recentTransaction.date}</p>
            <p>Note: ${recentTransaction.note}</p>
        </div>
        `
        const closeButton = document.createElement("button")
        closeButton.innerHTML = "close"
        memberInfoDisplayModal.appendChild(closeButton)
        closeButton.addEventListener("click", ()=>{
            memberInfoDisplayModal.close()
        })
        memberInfoDisplayModal.show()
    })
    const name = document.createElement("p");
    const phone = document.createElement("p");
    const email = document.createElement("p");
    const type = document.createElement("p");
    const todayDate = new Date().toISOString().split("T")[0];
    const endDate = memberData[i].subscription.endDate;
    name.innerText = `Name: ${memberData[i].name}`;
    phone.innerText = `Phone Number: ${memberData[i].phone}`;
    email.innerText = `Email: ${memberData[i].email}`;
    if (endDate >= todayDate) {
        type.innerText = "Status: Active";
    } else {
        type.innerText = "Status: Expired";
    }
    memberDeleteButton.addEventListener("click",()=>{
        memberData.splice(i,1)
        localStorage.setItem("memberData",JSON.stringify(memberData))
        memberDisplay()
    })
    memberEditButton.addEventListener("click",()=>{
        memberEditModal.show()
        const memberEditModalName = document.getElementById("memberEditModalName")
        const memberEditModalPhone = document.getElementById("memberEditModalPhone")
        const memberEditModalEmail = document.getElementById("memberEditModalEmail")
        const memberEditModalHeight = document.getElementById("memberEditModalHeight")
        const memberEditModalWeight = document.getElementById("memberEditModalWeight")
        const memberEditModalCloseBtn = document.getElementById("memberEditModalCloseBtn") 
        const memberEditModalSaveBtn = document.getElementById("memberEditModalSaveBtn")
        memberEditModalName.value= memberData[i].name
        memberEditModalPhone.value = memberData[i].phone
        memberEditModalEmail.value = memberData[i].email
        memberEditModalWeight.value = memberData[i].weight
        memberEditModalHeight.value = memberData[i].height
        memberEditModalSaveBtn.addEventListener("click" , ()=>{

            const phone = memberEditModalPhone.value.trim();
            if (!checkPhone(phone)) {
                alert("Please enter a valid phone number");
                return;
            }
            const email = memberEditModalEmail.value.trim();
            if (!checkEmail(email)) {
                alert("Please enter a valid email address");
                return;
            }
            const height = memberEditModalHeight.value.trim();
            if (!checkHeight(height)) {
                alert("Please enter a valid height");
                return;
            }
            const weight = memberEditModalWeight.value.trim();
            if (!checkWeight(weight)) {
                alert("Please enter a valid weight");
                return;
            }

            memberData[i].name = memberEditModalName.value
            memberData[i].phone = memberEditModalPhone.value
            memberData[i].email = memberEditModalEmail.value
            memberData[i].weight = memberEditModalWeight.value
            memberData[i].height = memberEditModalHeight.value
            localStorage.setItem("memberData" , JSON.stringify(memberData))
            memberEditModal.close();
            memberDisplay()
        })
        memberEditModalCloseBtn.addEventListener("click" , ()=>{
            memberEditModal.close();
        })
    })
    memberDetailsContainer.appendChild(name);
    memberDetailsContainer.appendChild(phone);
    memberDetailsContainer.appendChild(email);
    memberDetailsContainer.appendChild(type);
    memberDetailsContainer.appendChild(memberDeleteButton);
    memberDetailsContainer.appendChild(memberEditButton);
    memberDetailsContainer.appendChild(memberDetailsButton);
    return memberDetailsContainer;
}

function checkPhone(phone){
    const phonePattern = /^[6-9]\d{9}$/;
    if (phone === "" || !phonePattern.test(phone)) {
        return false;
    }
    return true;
}

function checkEmail(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailPattern.test(email)) {
        return false;
    }
    return true;
}

function checkHeight(height){
    const heightPattern = /^[1-9]\d*$/;
    if (height === "" || !heightPattern.test(height) || Number(height) < 50 || Number(height) > 250) {
        return false;
    }
    return true;
}

function checkWeight(weight){
    const weightPattern = /^[1-9]\d*$/;
    if (weight === "" || !weightPattern.test(weight) || Number(weight) < 20 || Number(weight) > 300) {
        return false;
    }
    return true;
}
memberDisplay()