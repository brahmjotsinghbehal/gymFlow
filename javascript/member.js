    let memberData = JSON.parse(localStorage.getItem("memberData")) || [];
    let transactionData = JSON.parse(localStorage.getItem("transactionData")) || [];
    const memberFilterValue = document.getElementById("memberFilterValue")
    const memberSearchInput = document.getElementById("memberSearchInput")
    const memberContainer=document.getElementById("memberContainer")
    const memberEditModal = document.getElementById("memberEditModal")
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

    // function removeFilter(){
    //     memberDisplay()
    // }

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
        memberDeleteButton.innerHTML = "Delete"
        memberEditButton.innerHTML = "Edit"


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
                memberData[i].name = memberEditModalName.value
                memberData[i].phone = memberEditModalPhone.value
                memberData[i].email =memberEditModalEmail.value
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

        return memberDetailsContainer;
    }



    memberDisplay()
