let memberData = JSON.parse(localStorage.getItem("memberData")) || [];
let transactionData = JSON.parse(localStorage.getItem("transactionData")) || [];
const memberFilterValue = document.getElementById("memberFilterValue")
const memberSearchInput = document.getElementById("memberSearchInput")

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
            const memberDetailsContainer=document.createElement("div")
            const name=document.createElement("p")
            const phone=document.createElement("p")
            const email=document.createElement("p")
            const type=document.createElement("p")
            name.innerText=`Name:${memberData[i].name}`
            phone.innerText=`Phone Number:${memberData[i].phone}`
            email.innerText=`Email :${memberData[i].email}`
            type.innerText="Status : Expired"
            memberDetailsContainer.appendChild(name)
            memberDetailsContainer.appendChild(phone)
            memberDetailsContainer.appendChild(email)
            memberDetailsContainer.appendChild(type)
            memberContainer.appendChild(memberDetailsContainer)
        }
        if(memberFilterValue.value==="active" && todayDate<=endDate){
            const memberDetailsContainer=document.createElement("div")
            const name=document.createElement("p")
            const phone=document.createElement("p")
            const email=document.createElement("p")
            const type=document.createElement("p")
            name.innerText=`Name:${memberData[i].name}`
            phone.innerText=`Phone Number:${memberData[i].phone}`
            email.innerText=`Email :${memberData[i].email}`
            type.innerText="Status : Active"
            memberDetailsContainer.appendChild(name)
            memberDetailsContainer.appendChild(phone)
            memberDetailsContainer.appendChild(email)
            memberDetailsContainer.appendChild(type)
            memberContainer.appendChild(memberDetailsContainer)
        }

    }
})

// function removeFilter(){
//     memberDisplay()
// }

function memberDisplaySearch(temp){
    const memberContainer=document.getElementById("memberContainer")
    memberContainer.innerHTML=""
    for(let i=0;i<temp.length;i++){
        const memberDetailsContainer=document.createElement("div")
        const name=document.createElement("p")
        const phone=document.createElement("p")
        const email=document.createElement("p")
        const type=document.createElement("p")
        const todayDate = new Date().toISOString().split("T")[0]
        const endDate = memberData[temp[i]].subscription.endDate
        name.innerText=`Name:${memberData[temp[i]].name}`
        phone.innerText=`Phone Number:${memberData[temp[i]].phone}`
        email.innerText=`Email :${memberData[temp[i]].email}`
        if(endDate>=todayDate){
            type.innerText="Status : Active"
        }
        else if(endDate<todayDate){
            type.innerText="Status : Expired"
        }
        memberDetailsContainer.appendChild(name)
        memberDetailsContainer.appendChild(phone)
        memberDetailsContainer.appendChild(email)
        memberDetailsContainer.appendChild(type)
        memberContainer.appendChild(memberDetailsContainer)
    }
}



function memberDisplay(){
    const memberContainer=document.getElementById("memberContainer")
    memberContainer.innerHTML=""
    for(let i = 0;i<memberData.length;i++){
        const memberDetailsContainer=document.createElement("div")
        const name=document.createElement("p")
        const phone=document.createElement("p")
        const email=document.createElement("p")
        const type=document.createElement("p")
        const todayDate = new Date().toISOString().split("T")[0]
        const endDate = memberData[i].subscription.endDate


        name.innerText=`Name:${memberData[i].name}`
        phone.innerText=`Phone Number:${memberData[i].phone}`
        email.innerText=`Email :${memberData[i].email}`
        if(endDate>=todayDate){
            type.innerText="Status : Active"
        }
        else if(endDate<todayDate){
            type.innerText="Status : Expired"
        }
        
        memberDetailsContainer.appendChild(name)
        memberDetailsContainer.appendChild(phone)
        memberDetailsContainer.appendChild(email)
        memberDetailsContainer.appendChild(type)
        memberContainer.appendChild(memberDetailsContainer)
    }
}


memberDisplay()
