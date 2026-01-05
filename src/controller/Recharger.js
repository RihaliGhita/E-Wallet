import { recharger } from "../Services/rechargerService.js";

const cardSelect = document.getElementById("cardSelect");
const amountInput=document.getElementById("amount");
const rechargerBtn=document.getElementById("rechBtn");
const result=document.getElementById("result");
const viewBtn=document.getElementById("ViewBalanceBtn");

const user = JSON.parse(sessionStorage.getItem("currentuser"));

// charger dynamiquement les cartes de l'utilisateur
cardSelect.innerHTML = "";
user.cards.forEach(card => {
    const option = document.createElement("option");
     option.value = card.NomCarte;
    option.textContent = `${card.NomCarte}`;//  option.textContent = `${card.NomCarte} - ${card.Balance} DH`;
    cardSelect.appendChild(option);
});

rechargerBtn.addEventListener("click",handleRecharger);
function handleRecharger(){
    const amount = parseFloat(amountInput.value);
    const cardName = cardSelect.value;
     result.textContent="Processing...";
     if(!amount||amount<=0){  //valider le montant
            alert("Montant invalide");
            return;
        }
   
      recharger(user, cardName, amount)
        .then(() => result.textContent = "Rechargement réussi ")
        .catch(err => alert(err));
 }



viewBtn.addEventListener("click",handleViewBalance);
function handleViewBalance(){
    setTimeout(()=> {
        window.location.href="/src/view/dashboard.html";
    },1000);
}
/*
function handleRecharger(){
    let montant=parseFloat(amountInput.value);
    result.textContent="Processing...";
    setTimeout(() => {
        if(!montant||montant<=0){//valider le montant
            result.textContent="Montant invalide";
            result.style.color="red";
            return;
        }
        //On doit relire sessionStorage au moment de l’action, pas une seule fois.
        const user=JSON.parse(sessionStorage.getItem("currentuser"));//recuperation de l'utilisateur courant du sessionStorage
        if (!user) {//si aucun utilisateur n'est connecté
            result.textContent = "Aucun utilisateur connecté";
            result.style.color = "red";
            return;
        }
        if (typeof user.Balance !== "number") user.Balance = 0;//s'assurer que le solde est un nombre
        if (!Array.isArray(user.transactions)) user.transactions = [];//s'assurer que les transactions sont un tableau
            user.Balance+=montant;
            const newTransaction={//créer une nouvelle transaction
                type:"+",
                title:"Rechargement",
                amount:montant,
                date:new Date().toLocaleDateString(),// date actuelle
                status:"Successful"

              };
            user.transactions.push(newTransaction);
            sessionStorage.setItem("currentuser",JSON.stringify(user));// sauvegarde l'utilisateur dans le sessionStorage
            result.textContent="Rechargement avec succès";
            result.style.color="green";
            amountInput.value="";

    },1000);
}*/



    
