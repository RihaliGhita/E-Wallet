const BeneficiaireInput=document.getElementById("beneficiaire");
const amountInput=document.getElementById("amount");
const payerBtn=document.getElementById("payerBtn");
const result=document.getElementById("result");
const viewBtn=document.getElementById("ViewBalanceBtn");
const message = document.getElementById("message");
const user=JSON.parse(sessionStorage.getItem("currentuser"));

function checkUser(user) {
    return new Promise((resolve, reject) => {
        if (!user) {
            reject("Utilisateur non connecté");
            return;
        }
        resolve(user);
    });
}

function checkSolde(user, montant) {
    return new Promise((resolve, reject) => {
        if (user.Balance < montant) {
            reject("Solde insuffisant");
            return;
        }
        resolve(user);
    });
}

function addTransaction(user, montant,beneficiaire) {
    return new Promise((resolve) => {
        user.transactions.push({
            type: "-",
            title:`Paiement à ${beneficiaire}`,
            amount: montant,
            date: new Date().toLocaleDateString(),
            status: "Successful"
        });
        resolve(user);
    });
}
function updateSolde(user, montant) {
    return new Promise((resolve) => {
        user.Balance -= montant;
        resolve("Paiement effectué avec succès.");
    });
}

payerBtn.addEventListener("click", handlePayer);

function handlePayer() {
    payerBtn.textContent = "loading...";
    const beneficiaire = BeneficiaireInput.value.trim();
    const montant = parseFloat(amountInput.value);

    checkUser(user)
        .then(user => {
            message.textContent = "Utilisateur vérifié ";
            return checkSolde(user, montant);
        })
        .then(user => {
            message.textContent = "Solde suffisant ";
            return addTransaction(user, montant, beneficiaire);
        })
        .then(user => {
            return updateSolde(user, montant);
        })

        .then(message => {
            result.textContent=message;
            result.style.color="green";
            payerBtn.textContent = "Payer";
             sessionStorage.setItem("currentuser",JSON.stringify(user));
              amountInput.value="";
             BeneficiaireInput.value="";
        })
        .catch(error => {
                message.textContent = error;
                message.style.color = "red";
                 payerBtn.textContent = "Payer";
            });


}
viewBtn.addEventListener("click",handleView);
function handleView(){
    window.location.href="/src/view/dashboard.html";
}


/*
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
}*/

