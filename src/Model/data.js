const  users=[{//premier utilisateur
        email:"ghita@gmail.com", 
        numcompte:"1111",
        password:"1234",
        name:"Ghita",
        Balance:20000,
        transactions:[//deux transactions de l'utilisateur
            {type:"-",title:"Achat en ligne",amount:500,date:"1 /11/ 2024",status:"Successful"},
            {type:"+",title:"Salaire",amount:30000,date:"29 /11/ 2025",status:"Successful"}

        ],
        cards:[
           { Id:111111,NomCarte:"Crypto",Balance:3600},
           {Id:222222,NomCarte:"MasterCard Standard",Balance:16400}
        ]
    },
    {//deuxième utilisateur
        email:"hiba@gmail.com",
        numcompte:"4444",
        password:"0987",
        name:"Hiba",
        Balance:30000,
        transactions:[
            {type:"-",title:"Restaurant",amount:350,date:"18 /10/ 2025",status:"failed"},
            {type:"+",title:"Virememt",amount:1000,date:"13 /12/ 2025",status:"Successful"}
        ],
         cards:[
           { Id:444333,NomCarte:"Visa",Balance:10000},
           {Id:555444,NomCarte:"MasterCard Standard",Balance:5400},
           {Id:222111,NomCarte:"MasterCard Gold",Balance:14600}
        ]


    }

]


function findUser(email,password){//fonction pour trouver un utilisateur par email et password
    let user=null;
    user=users.find((u)=>u.email==email&&u.password===password);//chercher l'utilisateur dans le tableau users
    return user;//retourner l'utilisateur trouvé ou null s'il n'existe pas
}

function findUserByAccount(numcompte){
    return users.find((u)=> u.numcompte === numcompte);

}

function getUsers(){ //fonction pour obtenir tous les utilisateurs
    return JSON.parse(localStorage.getItem("users")) || [];
}

function addUser(user){//fonction pour ajouter un nouvel utilisateur
    const users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));//enregistrer le tableau mis à jour dans le localStorage
}

export{findUser,getUsers,addUser,findUserByAccount};//exporter les fonctions pour l'utiliser dans d'autres fichiers
