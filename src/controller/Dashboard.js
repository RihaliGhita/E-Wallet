
const welcomeMessage=document.getElementById("welcome_message");
const Balance=document.getElementById("balance");
const transactionsTable=document.querySelector("#transactions");
const filter=document.getElementById("selection");
const rech=document.getElementById("Recherche");
const transeferBtn=document.getElementById("transferer");
const payerBtn=document.getElementById("payer");
const rechargerBtn=document.getElementById("recharger");
const user=JSON.parse(sessionStorage.getItem("currentuser"));//récupérer l'utilisateur courant du sessionStorage

if (!user) {
    window.location.href = "/src/view/login.html";
}
if (typeof user.Balance !== "number") user.Balance = 0;
if (!Array.isArray(user.transactions)) user.transactions = [];
Balance.textContent=user.Balance+" MAD";//afficher le solde de l'utilisateur
welcomeMessage.textContent="Welcome"+" "+user.name;//afficher le nom de l'utilisateur

function afficher(tab){//fonction pour afficher les transactions dans le tableau
    transactionsTable.innerHTML="";//vider le tableau avant d'afficher les nouvelles transactions
 tab.forEach((t)=>{ //boucle pour traiter chaque transaction 
    const tr=document.createElement("tr");//créer une nouvelle rangée pour chaque transaction
    const date=document.createElement("td");//créer une cellule pour la date
    date.textContent=t.date;//ajouter la date à la cellule
    const description=document.createElement("td");//créer une cellule pour la description
    description.textContent=t.title+ " "+ t.status;
    const amount=document.createElement("td");
    amount.textContent=t.amount+" MAD";
    const type=document.createElement("td");
    type.textContent=t.type;
    tr.appendChild(date);//ajouter les cellules au rangée
    tr.appendChild(description);
    tr.appendChild(type);
    tr.appendChild(amount);
    transactionsTable.appendChild(tr);
});
}

 afficher(user.transactions);


filter.addEventListener("change",handelfilter);
function handelfilter(){
    let t=user.transactions;
      if(filter.value==="entrer"){
        t=t.filter(e=>e.type==="+");
        afficher(t);
      }
      if(filter.value==="sortir"){
        t=t.filter(e=>e.type==="-");
        afficher(t);
      }
      if(filter.value==="tout"){
        afficher(user.transactions);
      }
}
rech.addEventListener("input",handleSearch);
function handleSearch(){
    let t=user.transactions;
    if(rech.value==="-"){
        t=t.filter(e=>e.type==="-");
        afficher(t);
    }else if(rech.value==="+"){
        t=t.filter(e=>e.type==="+");
        afficher(t);
    }else{
        afficher(user.transactions);
    }
}
payerBtn.addEventListener("click",handlePayer);
function handlePayer(){
    payerBtn.tyextContent="loading...";
    setTimeout(() => {
        window.location.href="/src/view/payer.html";
    },1000);
}

rechargerBtn.addEventListener("click",handleRecharger);
function handleRecharger(){
    rechargerBtn.textContent="loading...";
    setTimeout(()=> {
        window.location.href="/src/view/recharger.html";
    },1000);
}

transeferBtn.addEventListener("click",handleTransfer);
function handleTransfer(){
    transeferBtn.textContent="loading..";
    setTimeout(() =>{
        window.location.href="/src/view/transferer.html";
    },1000);

}

export{afficher};//exporter la fonction afficher pour l'utiliser dans d'autres fichiers


