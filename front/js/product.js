// ON ISOLE l'ID DU PRODUIT PRÉSENT DANS L'URL
    const queryString_url_id = window.location.search;
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    const id = urlSearchParams.get("id")

// TOUTES LES DONNÉES A AFFICHER
fetch('http://localhost:3000/api/products/'+id) // promise: wait until resolve/reject
    .then(response => response.json())
    .then(json => {
        afficheImage(json);
        afficheNomDuProduit(json);
        affichePrix(json);
        afficheDescription(json);
        afficheCouleurs(json);
    }
);

// AFFICHE L'IMAGE DU PRODUIT
function afficheImage(data) {
        document.querySelector('.item__img').innerHTML += `
            <img src="${data['imageUrl']}" alt="${data['altTxt']}">
        `
    }

// AFFICHE LE NOM DU PRODUIT
function afficheNomDuProduit(data) {
        document.querySelector('#title').innerHTML += `
            ${data['name']}
        `
    }
   
// AFFICHE LE PRIX DU PRODUIT
function affichePrix(data) {
    document.querySelector('#price').innerHTML += `
        ${data['price']}
    `
}

// AFFICHE LA DESCRIPTION DU PRODUIT
function afficheDescription(data) {
    document.querySelector('#description').innerHTML += `
        ${data['description']}
    `
}

// AFFICHE LES COULEURS DISPONIBLES
function afficheCouleurs(data) {
    for (let i = 0; i < data.colors.length; i++) {
        
        document.querySelector('#colors').innerHTML += `
        <option value="${data.colors[i]}">${data.colors[i]}</option>
        `
    }
}
// -------------------------------------------- PANIER --------------------------------------------------------

// Récupération des informations sélectionnées lors du click sur "Ajouter au panier"
document.getElementById("addToCart").addEventListener("click", function ajoutLocalStorage() {

        //ID du Produit
        const idProduit = id;
        
        //Nom du Produit
        const nomProduit = document.getElementById('title').innerText;

        //Prix du Produit
        const prixProduit = document.getElementById('price').innerText;

        //Couleur sélectionnée
        const listeCouleurs = document.getElementById('colors');
        const couleurProduit = listeCouleurs.options[listeCouleurs.selectedIndex].innerText;

        //Quantité souhaité par l'acheteur
        const quantiteProduit = document.getElementById('quantity').value;

        //Prix Total à payer pour cette commande
        const prixTotal = prixProduit * quantiteProduit;

// Ajout des informations sélectionnées au localStorage

        // Création du tableau contenant toutes les données à ajouter au LocalStorage
        let infosProduitSelectionne = {
            idProduit,
            nomProduit,
            prixProduit,
            couleurProduit,
            quantiteProduit,
            prixTotal,
        }

        // On récupère les info qui nous intéressent pour savoir si elles ont déjà été saisis
        let IDProduitSelectionne = infosProduitSelectionne['idProduit'];
        let CouleurProduitSelectionne = infosProduitSelectionne['couleurProduit'];

        // On récupère les infos du LocalStorage pour savoir s'il est vide ou non
        let produitsDansLePanier = JSON.parse(localStorage.getItem("monPanier"));

            // Si localStorage contient déjà un produit = ajoute le produit à la liste existante
            if(produitsDansLePanier){
                produitsDansLePanier.push(infosProduitSelectionne);
                localStorage.setItem("monPanier", JSON.stringify(produitsDansLePanier))   
            }else{
                // Si localStorage est vide = on créé un tableau monPanier + on ajoute le produit à la liste
                produitsDansLePanier = [];
                produitsDansLePanier.push(infosProduitSelectionne);
                localStorage.setItem("monPanier", JSON.stringify(produitsDansLePanier))
            }
});


