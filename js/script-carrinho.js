document.addEventListener('DOMContentLoaded', function () {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');
    const quantidadeItens = document.getElementById('quantidade-itens');
    const botoesComprar = document.querySelectorAll('.comprar');
    const botaoFinalizarCompra = document.getElementById('finalizar-compra');
    const formEndereco = document.getElementById('form-endereco');

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let total = 0;

    // Função para atualizar o carrinho e o total na tela
    function atualizarCarrinho() {
        listaCarrinho.innerHTML = '';
        total = 0;
        let quantidadeTotal = 0;

        carrinho.forEach((item, index) => {
            const li = document.createElement('li');
            const subtotal = item.preco * item.quantidade;
            total += subtotal;
            quantidadeTotal += item.quantidade;

            li.innerHTML = `
                <div class="item-carrinho">
                    <span class="nome-item">${item.nome}</span>
                    <span class="quantidade">Quantidade: ${item.quantidade}</span>
                    <span class="subtotal">Subtotal: R$ ${subtotal.toFixed(2)}</span>
                    <input type="number" class="quantidade-remover" data-indice="${index}" min="1" max="${item.quantidade}">
                    <button class="remover" data-indice="${index}">Remover</button>
                </div>
            `;
            listaCarrinho.appendChild(li);
        });

        totalCarrinho.textContent = total.toFixed(2);
        quantidadeItens.textContent = quantidadeTotal;
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    // Adiciona evento de clique aos botões de comprar
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', function () {
            const nome = this.getAttribute('data-nome');
            const preco = parseFloat(this.getAttribute('data-preco'));

            // Verifica se o item já está no carrinho
            const itemExistente = carrinho.find(item => item.nome === nome);
            if (itemExistente) {
                itemExistente.quantidade++;
            } else {
                carrinho.push({ nome, preco, quantidade: 1 });
            }
            atualizarCarrinho();
        });
    });

    // Adiciona evento de clique ao botão de remover
    listaCarrinho.addEventListener('click', function (event) {
        if (event.target.classList.contains('remover')) {
            const indice = parseInt(event.target.getAttribute('data-indice'));
            const quantidadeRemover = parseInt(listaCarrinho.querySelector(`.quantidade-remover[data-indice="${indice}"]`).value);
            if (quantidadeRemover > 0) {
                carrinho[indice].quantidade -= quantidadeRemover;
                if (carrinho[indice].quantidade <= 0) {
                    carrinho.splice(indice, 1);
                }
                atualizarCarrinho();
            }
        }
    });

    // Adiciona evento de clique ao botão de finalizar compra
    botaoFinalizarCompra.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        const nome = document.getElementById('nome').value;
        const endereco = document.getElementById('endereco').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        const cep = document.getElementById('cep').value;
        const tel = document.getElementById('tel').value;

        let mensagem = `*Dados do Pedido:*\n\n`;
        mensagem += `*Nome:* ${nome}\n`;
        mensagem += `*Endereço:* ${endereco}\n`;
        mensagem += `*Cidade:* ${cidade}\n`;
        mensagem += `*Estado:* ${estado}\n`;
        mensagem += `*CEP:* ${cep}\n`;
        mensagem += `*Telefone:* ${tel}\n\n`;

        mensagem += `*Itens do Carrinho:*\n`;
        carrinho.forEach(item => {
            mensagem += `- ${item.nome} (Quantidade: ${item.quantidade}, Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)})\n`;
        });
        mensagem += `\n*Total:* R$ ${total.toFixed(2)}`;

        const numeroWhatsApp = '5527999468598'; // Coloque o número do WhatsApp desejado
        const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;

        window.location.href = url;
    });

    // Atualiza o carrinho ao carregar a página
    atualizarCarrinho();
});

function voltarParaProdutos() {
    window.location.href = 'index.html';
}
