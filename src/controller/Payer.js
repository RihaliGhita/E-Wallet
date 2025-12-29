const BeneficiaireInput=document.getElementById("beneficiaire");
const amountInput=document.getElementById("amount");
const payerBtn=document.getElementById("payerBtn");
const result=document.getElementById("result");
const viewBtn=document.getElementById("ViewBalanceBtn");
const user=JSON.parse(sessionStorage.getItem("currentuser"));


payerBtn.addEventListener("click",handlePayer);
function handlePayer(){
    let montant=parseFloat(amountInput.value);//récupérer le montant
    let beneficiair=BeneficiaireInput.value; //récupérer le bénéficiaire
    result.textContent="Processing...";
    setTimeout(() =>{
        if(!montant || montant<=0){
            result.textContent="Montant invalide";
            result.style.color="red";
            return;
        }
        if(!beneficiair){
            result.textContent="Bénéficiaire invalide";
            result.style.color="red";
            return;
        }
        user.Balance-=montant;
        const newTransaction={
            type:"-",
            title:`Paiement à ${beneficiair}`,
            amount:montant,
            date: new Date().toLocaleDateString(),
            status:"Successful"
        };
        user.transactions.push(newTransaction);
        sessionStorage.setItem("currentuser",JSON.stringify(user));
        result.textContent="Paiement effectué avec succès";
        result.style.color="green";
        amountInput.value="";
        BeneficiaireInput.value="";
    },1000);
}

viewBtn.addEventListener("click",handleView);
function handleView(){
    window.location.href="/src/view/dashboard.html";
}