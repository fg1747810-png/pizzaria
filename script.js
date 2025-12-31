function searchProducts() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const produtos = document.querySelectorAll(".produto");
    const noResults = document.getElementById("noResults");

    const tituloPizzas = document.getElementById("cardapio");
    const tituloBebidas = document.getElementById("titulo-bebidas");

    let encontrouPizza = false;
    let encontrouBebida = false;

    produtos.forEach(produto => {
        const texto = produto.innerText.toLowerCase();
        const isPizza = produto.classList.contains("pizza");
        const isBebida = produto.classList.contains("bebida");

        if (texto.includes(input)) {
            produto.style.display = "block";
            if (isPizza) encontrouPizza = true;
            if (isBebida) encontrouBebida = true;
        } else {
            produto.style.display = "none";
        }
    });

    tituloPizzas.style.display = encontrouPizza ? "block" : "none";
    tituloBebidas.style.display = encontrouBebida ? "block" : "none";
    noResults.style.display = (encontrouPizza || encontrouBebida) ? "none" : "block";
}
