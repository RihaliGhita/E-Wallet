import { addUser } from "../Model/data.js";//importer la fonction addUser du fichier data.js";
//Récupérer les éléments du DOM
const nameInput=document.getElementById("name");
const cinInput=document.getElementById("CIN");
const emailInput=document.getElementById("email");
const passwordInput=document.getElementById("password");
const confirmPasswordInput=document.getElementById("confirmPassword");
const InscrireBtn=document.getElementById("signupbtn");
const message=document.getElementById("result");

nameInput.addEventListener("input",handelname);
function handelname(){
    const name=nameInput.value;
    if(name.length<3){
        message.textContent="Le nom doit contenir au moins 3 caractères";
        message.style.color="red";
    }
    else{
        message.textContent="";//Quand le champ devient valide, on efface le message d’erreur.
    }
}
emailInput.addEventListener("input",handelEmail);
function handelEmail(){
    const email=emailInput.value;
    if(!email.includes("@")||!email.includes(".")){ //includes() sert à vérifier si un texte contient un autre texte 
        message.textContent="L'email n'est pas valide";
        message.style.color="red";
    }else{
        message.textContent="";
    }

}
cinInput.addEventListener("input",handelCIN);
function handelCIN(){
    const cin=cinInput.value;
    if(cin.length!==8){
        message.textContent="Le numéro de CIN doit contenir exactement 8 caractères";
        message.style.color="red";
    }else{
        message.textContent="";
    }
}

passwordInput.addEventListener("input",handelPassword);
function handelPassword(){
    const password=passwordInput.value;
    if(password.length<6){
        message.textContent="Le mot de passe doit contenir au moins 6 caractères";
        message.style.color="red";
    }
    else{
        message.textContent="";
    }
}
confirmPasswordInput.addEventListener("input",handelConfirmPassword);
function handelConfirmPassword(){
    const password=passwordInput.value;
    const confirmPassword=confirmPasswordInput.value;
    if(password!==confirmPassword){
        message.textContent="Les mots de passe ne correspondent pas";
        message.style.color="red";
    }else{
        message.textContent="";
    }
}

InscrireBtn.addEventListener("click",handelSubmit);
function handelSubmit(){
    const name = nameInput.value;
    const cin = cinInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    // vérification finale
    if(!name || !cin || !email || !password){
        message.textContent="Veuillez remplir tous les champs";
        message.style.color="red";
        return;
    }

    // créer l'utilisateur
    const newUser = {
        name: name,
        cin: cin,
        email: email,
        password: password,
        Balance: 0,
        transactions: []
    };

    // enregistrer l'utilisateur
    addUser(newUser);

    message.textContent="Inscription réussie";
    message.style.color="green";

    InscrireBtn.textContent="loading...";

    setTimeout(() =>{
        window.location.href="/src/view/login.html";
    },1000);
}

