// ON ISOLE l'ID DU PRODUIT PRÉSENT DANS L'URL
    const queryString_url_id = window.location.search;
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    const id = urlSearchParams.get("id")
    console.log('ID du produit défini dans l\'URL :',id);

// TOUTES LES DONNÉES A AFFICHER
fetch('http://localhost:3000/api/products/'+id) // promise: wait until resolve/reject
    .then(response => response.json())
    .then(json => {
        afficheImage(json);
        afficheNomDuProduit(json);
        affichePrix(json);
        afficheDescription(json);
        afficheCouleurs(json);
        console.log(json);
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
    console.log('Il y a ',data.colors.length,' couleurs disponibles pour ce produit')
    for (let i = 0; i < data.colors.length; i++) {
        console.log('- ', i+1, data.colors[i])
        
        document.querySelector('#colors').innerHTML += `
        <option value="${data.colors[i]}">${data.colors[i]}</option>
        `
    }
}
