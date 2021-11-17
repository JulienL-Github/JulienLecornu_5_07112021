// ON ISOLE l'ID DU PRODUIT PRÉSENT DANS L'URL
    const queryString_url_id = window.location.search;
    const urlSearchParams = new URLSearchParams(queryString_url_id);
    const id = urlSearchParams.get("id")
    console.log('ID du produit défini dans l\'URL :',id);

// ON FAIT UN TABLEAU QUI REPREND TOUTES LES DONNÉES DU PRODUIT QUI CONTIENT CET ID
fetch('http://localhost:3000/api/products/') // promise: wait until resolve/reject

