let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarAoCarrinho(nome, preco) {
    const quantidade = parseInt(prompt("Digite a quantidade desejada:", "1")); // Solicita ao usuário que digite a quantidade desejada

    // Verifica se a quantidade é um número válido e maior que zero
    if (!isNaN(quantidade) && quantidade > 0) {
        // Verifica se o item já está no carrinho
        const itemExistente = carrinho.find(item => item.nome === nome);
        if (itemExistente) {
            // Se o item já estiver no carrinho, atualiza apenas a quantidade
            itemExistente.quantidade += quantidade;
        } else {
            // Se o item não estiver no carrinho, adiciona o novo item
            carrinho.push({ nome, preco, quantidade });
        }
        
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        window.location.href = 'carrinho.html';
    } else {
        alert("Por favor, digite uma quantidade válida.");
    }
}




