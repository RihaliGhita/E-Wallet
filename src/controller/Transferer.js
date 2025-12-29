const beneficiaireInput=document.getElementById("beneficiaire");
const amountInput=document.getElementById("amount");
const descriptionInput=document.getElementById("description");
const transfererBtn=document.querySelector("button[type='button']");
const viewBtn=document.getElementById("ViewBalanceBtn");
const result=document.getElementById("result");
const user=JSON.parse(sessionStorage.getItem("currentuser"));

transfererBtn.addEventListener("click",handelTransferer);
function handelTransferer(){
    let montant=parseFloat(amountInput.value);
    let beneficiaire=beneficiaireInput.value;
    result.textContent="Processing...";
    setTimeout(() =>{
        if(!montant || montant<=0){
            result.textContent="Montant invalide";
            result.style.color="red";
            return;
        }
        if(!beneficiaire){
            result.textContent="Bénéficiaire invalide";
            result.style.color="red";
            return;
        }
        user.Balance-=montant;
        const newTransaction={
            type:"-",
            title:`Transfert à ${beneficiaire}`,
            amount:montant,
            date: new Date().toLocaleDateString(),
            status:"Successful"
        };
        user.transactions.push(newTransaction);
        sessionStorage.setItem("currentuser",JSON.stringify(user));
        result.textContent="Transfert effectué avec succès";
        result.style.color="green";
        amountInput.value="";
        beneficiaireInput.value="";
    },1000);
}
viewBtn.addEventListener("click",handleViewBalance);
function handeleViewBalance(){
    window.location.href="/src/view/dashboard.html";
}

