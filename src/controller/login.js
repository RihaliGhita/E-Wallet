import{findUser} from"../Model/data.js";//importer la fonction findUser du fichier data.js
//Récupérer les éléments du DOM
const email=document.getElementById("mail");
const password=document.getElementById("password");
const submitbtn=document.getElementById("submitbtn");
const result=document.getElementById("result");
const displayBtn=document.getElementById("display");
const Inscription=document.getElementById("inscription");
 Inscription.addEventListener("click",() =>{
    window.location.href="/src/view/inscription.html";
 })
//Ajouter un écouteur d'événement pour afficher/masquer le mot de passe
displayBtn.addEventListener("click",()=> {
    if(password.type==="password"){//si le type est password on le change en text pour afficher le mot de passe
        password.type="text";
        displayBtn.textContent="🚫";
    }else{//sinon on le change en password pour masquer le mot de passe
        password.type="password";
        displayBtn.textContent="👁";
    }
});
 
submitbtn.addEventListener("click",handleSubmit);// on ne fait pas appel a la fonction handleSubmit ici on passe juste la reference de la fonction
function handleSubmit(){ //Fonction qui contient toute la logique de connexion
    //Récupérer les valeurs des champs email et password
    let mail=email.value;
    let pass=password.value;
    //Vérifier si l'email et le password sont corrects
    let user=null;//null signifie aucun utilisateur pour l'instant
    result.textContent="Verification..!!!";
    setTimeout(()=>{//simuler un delai de 1 seconde pour la verification
        if(!mail||!pass){//si l'email ou le password est vide
            result.textContent="email ou password incorrect";
            result.style.color="red";
        }else{//si l'email et le password ne sont pas vides
            user=findUser(mail,pass);
            if(user){//si l'utilisateur existe
                sessionStorage.setItem("currentuser",JSON.stringify(user));//stocker l'utilisateur dans le sessionStorage pour l’utiliser dans d’autres pages
                result.textContent="Login Successful";
                result.style.color="green";
                window.location.href="/src/view/dashboard.html";
            }else{//si l'utilisateur n'existe pas
                result.textContent="email ou password incorrect";
                result.style.color="red";
            }
        }
    },1000);
}