loadTousLesÉléments()

//Permet de recharger proprement tous les éléments lorsqu'on supprime un article
function loadTousLesÉléments() {

    //On récupère les produit stockés dans le LocalStorage
    function recupLocalStorage() {
        produitsSelectionnes = localStorage.getItem('monPanier');
        produitsSelectionnesParse = JSON.parse(produitsSelectionnes);
    }

    //On fait apparaitre tous les produits et leurs données dans le HTML
    recupLocalStorage();
    afficheProduits();

    function afficheProduits() {
        recupLocalStorage(); // => On récupère les produits dans le localStorage pour prendre en compte les modications
        document.querySelector('#cart__items').innerHTML = ``
        if (produitsSelectionnesParse.length == 0){
            document.querySelector('#cart__items').innerHTML = `Votre panier est vide`
        }else{
        for (let i = 0; i < produitsSelectionnesParse.length; i++) {
            document.querySelector('#cart__items').innerHTML += `
                <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                    <div class="cart__item__img">
                        <img src="${produitsSelectionnesParse[i]['imageProduit']}" alt="Photographie d'un canapé">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${produitsSelectionnesParse[i]['nomProduit']}</h2>
                            <p>Couleur choisie : ${produitsSelectionnesParse[i]['couleurProduit']}</p>
                            <p>Prix (unité) : ${produitsSelectionnesParse[i]['prixProduit']}  €</p>
                        </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitsSelectionnesParse[i]['quantiteProduit']}">
                        </div>
                    <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>
        `
    }
    }
    }

    function annuleAffichageProduits() {
        for (let i = 0; i < produitsSelectionnesParse.length; i++) {
            document.querySelector('#cart__items').innerHTML = `
        `
        }
    }


    //----------------------------- CALCULS DU TOTAL -----------------------------//
    //On calcule le Total
    let allQuantity = []
    let totalQuantity = 0;
    let totalPrices = 0;
    calculeQuantityTotal()
    afficheQuantityTotal()

    //On calcule le total quantity + prix
    function calculeQuantityTotal(){
        for (let i = 0; i < produitsSelectionnesParse.length; i++) {
            
            //on pousse la quantité
            allQuantity.push(parseInt(produitsSelectionnesParse[i].quantiteProduit))
            totalQuantity += allQuantity[i];

            //on pousse le prix

            totalPrices += produitsSelectionnesParse[i].quantiteProduit * produitsSelectionnesParse[i].prixProduit ;
        }
    }

    //On affiche le total quantity + prix
    function afficheQuantityTotal (){
        document.querySelector('#totalQuantity').innerHTML = `
            ${totalQuantity}
        `
        document.querySelector('#totalPrice').innerHTML = `
            ${totalPrices}
    `
    }

    //On remplace le total quantity + prix lors d'une modification/suppression
    function remplaceAfficheQuantityTotal (){
        document.querySelector('#totalQuantity').innerHTML = `
            ${totalQuantity}
        `
        document.querySelector('#totalPrice').innerHTML = `
            ${totalPrices}
    `
    }

    //----------------------------- MISE A JOUR DYNAMIQUE DES QUANTITÉS -----------------------------//
    allProducts = document.getElementsByTagName('input');

    for (let i = 0; i < produitsSelectionnesParse.length; i++) {
        allProducts[i].addEventListener("change", function newQuantity(){
            produitsSelectionnesParse[i].quantiteProduit = allProducts[i].value;
            localStorage.setItem("monPanier", JSON.stringify(produitsSelectionnesParse));
            //On recalcule le Total
            allQuantity = []
            totalQuantity = 0;
            totalPrices = 0;
            calculeQuantityTotal()
            remplaceAfficheQuantityTotal()
        })
    }   

    //----------------------------- SUPPRIMER UN ARTICLE -----------------------------//
    deleteButton = document.getElementsByClassName('deleteItem')

    for (let i = 0; i < produitsSelectionnesParse.length; i++) {
        deleteButton[i].addEventListener("click", function deleteProduct(){
            produitsSelectionnesParse.splice(i, 1)
            localStorage.setItem("monPanier", JSON.stringify(produitsSelectionnesParse));
            loadTousLesÉléments()
        })
    }
}


//-----------------------------  PASSER LA COMMANDE -----------------------------//
recupFirstName()
recupLastName()
recupAddress()
recupCity()
recupEmail()

let firstNameValidation = '';
let lastNameValidation = '';
let addressValidation = '';
let cityValidation = '';
let emailValidation = '';

//On récupère et on contrôle la validité du prénom
function recupFirstName() {
    formFirstName = document.getElementById("firstName");
    formFirstName.addEventListener("change", function getFirstName(){
    const firstName = formFirstName.value ;
    //On contrôle la validité du prénom
    const regExFirstname = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s-]{2,35}$/
    if (regExFirstname.test(firstName) == true){
        return true,
        firstNameValidation = "valid"
        }else{
        alert("Erreur dans le prénom !\nDésolé, votre prénom comporte un caractère non pris en compte")
        console.log(regExFirstname.test(firstName))
        }
    })
}

//On récupère et on contrôle la validité du nom de famille
function recupLastName() {
    formLastName = document.getElementById("lastName");
    formLastName.addEventListener("change", function getLastName(){
        const lastName = formLastName.value ;
        //On contrôle la validité du nom
        const regExLastName = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s-]{2,35}$/
        if (regExLastName.test(lastName) == true){
            return true,
            lastNameValidation = "valid"
        }else{
            alert("Erreur dans le nom de famille !\nDésolé, votre nom de famille comporte un caractère non pris en compte")
            return false
        }
    })
}

//On récupère et on contrôle la validité de l'adresse
function recupAddress() {
    formAddress = document.getElementById("address");
    formAddress.addEventListener("change", function getAddress(){
        const adress = formAddress.value ;
        //On contrôle la validité de l'address
        const regExAddress = /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ,\s-]{2,200}$/
        if (regExAddress.test(adress) == true){
            return true,
            addressValidation = "valid"
        }else{
            alert("Erreur dans l'adresse !\nDésolé, votre adresse comporte un caractère non pris en compte")
            return false
        }
    })
}

//On récupère et on contrôle la validité de la ville
function recupCity() {
    formCity = document.getElementById("city");
    formCity.addEventListener("change", function getCity(){
        const city = formCity.value ;
        //On contrôle la validité du nom de la ville
        const regExCity = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ\s-]{2,35}$/
        if (regExCity.test(city) == true){
            return true,
            cityValidation = "valid"
        }else{
            alert("Erreur dans le nom de la ville !\nDésolé, votre nom de famille comporte un caractère non pris en compte")
            return false
        }
    })
}

//On récupère et on contrôle la validité de l'eMail
function recupEmail() {
    formEmail = document.getElementById("email");
    formEmail.addEventListener("change", function getEmail(){
        const eMail = formEmail.value ;
        //On contrôle la validité de l'eMail
        const regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if (regExEmail.test(eMail) == true){
            return true,
            emailValidation = "valid"
        }else{
            alert("Erreur dans votre adresse eMail !\nLe format attendu est : exemple@nomdedomaine.com (ou .fr, .be ...)")
            return false
        }
    })
}

//On créé le tableau si tous les champs sont OK
envoiCommande()
function envoiCommande() {
    //on créé un tableau avec les données du client
    btnCommander = document.getElementById("order");
    btnCommander.addEventListener("click", function creationTableau(){
        console.log("click")
        console.log(firstNameValidation)
        if (firstNameValidation == "valid" && lastNameValidation == "valid" && addressValidation == "valid" && cityValidation == "valid" && emailValidation == "valid"){
            let contact = {
                'firstName': firstName.value,
                'lastName': lastName.value,
                'address': address.value,
                'city': city.value,
                'email': email.value
            }
            console.log(contact)
            postAPI(contact)
        }else{
            alert("Il y a une erreur dans le formulaire !\nVeuillez remplir correctement les champs demandés")
        }
    })
}
function postAPI(contact){
    let products = JSON.parse(localStorage.getItem("monPanier"));
    let prodID = [];
    for (let i = 0; i < products.length; i++ ) {
        prodID[i] = products[i]['idProduit']
    }; console.log(prodID);

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 'contact': contact, 'products': prodID })
    }).then( res => res.json() )
    .then( data => {
        console.log(data)
        console.log(data['orderId'])
        //window.location = "confirmation.html?orderId="+data['orderId']
        window.location.href="confirmation.html?orderId="+data['orderId']
    }  )
}