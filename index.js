let carrinho = {};
let subtotal = 0;
const taxaEntrega = 5;

// ALTERAR QUANTIDADE
function alterarPedido(nome, preco, qtd) {
    carrinho[nome] = (carrinho[nome] || 0) + qtd;

    if (carrinho[nome] <= 0) {
        carrinho[nome] = 0;
    }

    document.getElementById(`qtd-${nome}`).innerText = carrinho[nome];

    subtotal += preco * qtd;
    if (subtotal < 0) subtotal = 0;

    atualizarResumo();
}

// ATUALIZA RESUMO
function atualizarResumo() {
    let texto = "";
    for (let item in carrinho) {
        if (carrinho[item] > 0) {
            texto += `${item} x${carrinho[item]} | `;
        }
    }

    document.getElementById("resumo").innerText =
        texto || "Nenhuma pizza selecionada";

    document.getElementById("subtotal").innerText =
        "Subtotal: R$ " + subtotal.toFixed(2);

    document.getElementById("total").innerText =
        "Total: R$ " + (subtotal + taxaEntrega).toFixed(2);
}

// PESQUISA
document.getElementById("pesquisa").addEventListener("input", function () {
    let valor = this.value.toLowerCase();
    document.querySelectorAll(".item").forEach(item => {
        item.style.display = item.innerText.toLowerCase().includes(valor)
            ? "block"
            : "none";
    });
});

// WHATSAPP AUTOMÁTICO
function enviarWhats() {
    let endereco = document.getElementById("endereco").value.trim();
    let pagamento = document.getElementById("pagamento").value;

    if (subtotal === 0 || endereco === "" || pagamento === "") {
        alert("Preencha o pedido, endereço e forma de pagamento!");
        return;
    }

    let msg = "🍕 *Pedido Bella Pizza* %0A";
    for (let item in carrinho) {
        if (carrinho[item] > 0) {
            msg += `- ${item} x${carrinho[item]}%0A`;
        }
    }

    msg +=
        `%0ASubtotal: R$ ${subtotal.toFixed(2)}` +
        `%0ATaxa de entrega: R$ ${taxaEntrega.toFixed(2)}` +
        `%0ATotal: R$ ${(subtotal + taxaEntrega).toFixed(2)}` +
        `%0AForma de pagamento: ${pagamento}` +
        `%0AEndereço: ${endereco}`;

    let url = `https://api.whatsapp.com/send?phone=5587999606256&text=${msg}`;
    window.open(url, "_blank");
}
// GARANTIR QUE O SITE SEMPRE ABRA NO TOPO
window.addEventListener("load", () => {
    if (window.location.hash) {
        history.replaceState(null, null, " ");
        window.scrollTo(0, 0);
    }
});
