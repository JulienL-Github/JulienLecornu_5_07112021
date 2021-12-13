fetch('http://localhost:3000/api/products/') // promise: wait until resolve/reject 
    .then(response => response.json())
    .then(json => afficheCanape(json))
    ;

// AFFICHE LES CARDS DES CANAPES : LIEN + IMG + NOM + DESCRIPTION
function afficheCanape(data) {
    for (let i = 0; i < data.length; i++) {

        document.querySelector('#items').innerHTML += `
            <a href="./product.html?id=${data[i]['_id']}">
                <article>
                    <img src="${data[i]['imageUrl']}" alt="${data[i]['altTxt']}">
                    <h3 class="productName">${data[i]['name']}</h3>
                    <p class="productDescription">${data[i]['description']}</p>
                </article>
            </a>
        `
    }
}