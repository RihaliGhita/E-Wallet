const loginBtn=document.getElementById("Loginbtn");
loginBtn.addEventListener('click',handlelogin);
function handlelogin(){
    loginBtn.textContent="loading...";
    setTimeout(() => {
        window.location.href="/src/view/login.html";
        
    },1000);
}
const signinBtn=document.getElementById("Signinbtn");
signinBtn.addEventListener('click',handelSignin);
function handelSignin(){
    signinBtn.textContent="loading...";
    setTimeout(() =>{
        window.location.href="/src/view/inscription.html";
    },1000);
}

