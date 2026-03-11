const CHAVE_PIX = "eee4da1f-c91b-473a-8f6a-be49e70731dc";

//Formata a moeda para o padrão br
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function gerarOpcoesParcelamento(valorTotal) {
    const selectParcelas = document.getElementById('card-parcelas');
    if (!selectParcelas) return;

    selectParcelas.innerHTML = '';

    for (let i = 1; i <= 12; i++) {
        const valorParcela = valorTotal / i;
        const textoParcela = `${i}x de ${formatarMoeda(valorParcela)} sem juros`;

        const option = document.createElement('option');
        option.value = i;
        option.text = textoParcela;
        selectParcelas.appendChild(option);
    }
}

let pixCopiaEColaAtual = "";

function copiarPix() {
    // Se o código não foi gerado, não faz nada
    if (!pixCopiaEColaAtual) return;

    // Copia a linha digitável completa (com valor, nome, etc)
    navigator.clipboard.writeText(pixCopiaEColaAtual).then(() => {
        const btn = document.getElementById("btnCopiarPix");
        const textoOriginal = btn.innerHTML; // Salva o HTML original (ícone + texto)

        btn.innerHTML = '<i class="fas fa-check"></i> CÓDIGO PIX COPIADO!';
        btn.style.background = "#28a745"; // Fica verde

        setTimeout(() => {
            btn.innerHTML = textoOriginal; // Volta ao normal
            btn.style.background = "#32bcad";
        }, 3000);
    });
}

function carregarCarrinho() {
    const cart = JSON.parse(localStorage.getItem('eletroShopCart')) || [];
    const container = document.getElementById('display-item');
    let total = 0;

    container.innerHTML = cart.length ? "" : "<p>Carrinho vazio</p>";

    cart.forEach((item, index) => {
        total += item.price;

        const img = item.img
            ? `<img src="${item.img}" onerror="this.style.display='none'">`
            : `<div style="width:60px"></div>`;

        container.innerHTML += `
            <div class="item-resumo">
                ${img}
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${formatarMoeda(item.price)}</div>
                </div>
                <i class="fas fa-trash" style="color:#ccc; cursor:pointer" onclick="removerItem(${index})"></i>
            </div>`;
    });

    window.totalBase = total;
    atualizarValores();
}

function removerItem(i) {
    let cart = JSON.parse(localStorage.getItem('eletroShopCart')) || [];
    cart.splice(i, 1);
    localStorage.setItem('eletroShopCart', JSON.stringify(cart));
    carregarCarrinho();
}

function atualizarValores() {
    const metodo = document.getElementById('pagamento-metodo').value;
    const sub = document.getElementById('subtotal');
    const totalEl = document.getElementById('valor-total');
    const savings = document.getElementById('pix-savings');
    const pixArea = document.getElementById('pix-area');
    const cardArea = document.getElementById('card-area');

    sub.innerText = formatarMoeda(window.totalBase);

    if(metodo === 'pix') {
        const desc = window.totalBase * 0.95;
        totalEl.innerText = formatarMoeda(desc);
        savings.style.display = 'block';
        pixArea.style.display = 'block';
        cardArea.style.display = 'none';
    } else {
        totalEl.innerText = formatarMoeda(window.totalBase);
        savings.style.display = 'none';
        pixArea.style.display = 'none';
        cardArea.style.display = 'block';

        gerarOpcoesParcelamento(window.totalBase);
    }
}

document.getElementById('pagamento-metodo').addEventListener('change', atualizarValores);

document.getElementById('cep').addEventListener('input', async (e) => {
    let v = e.target.value.replace(/\D/g,'');
    if(v.length > 5) v = v.slice(0,5) + '-' + v.slice(5,8);
    e.target.value = v;

    if(v.length === 9) {
        document.getElementById('cep-loading').style.display = 'inline-block';
        const res = await fetch(`https://viacep.com.br/ws/${v.replace('-','')}/json/`);
        const d = await res.json();
        document.getElementById('rua').value = d.logradouro || "";
        document.getElementById('bairro').value = d.bairro || "";
        document.getElementById('cidade').value = d.localidade ? `${d.localidade}/${d.uf}` : "";
        document.getElementById('cep-loading').style.display = 'none';
    }
});

function gerarPayloadPix(valor) {
    const chave = CHAVE_PIX;
    const nome = "ELETROSHOP";
    const cidade = "BRASILIA";

    valor = parseFloat(valor).toFixed(2);

    function format(id, value) {
        const size = value.length.toString().padStart(2, '0');
        return id + size + value;
    }

    const payload =
        "000201" +
        format("26",
            format("00", "BR.GOV.BCB.PIX") +
            format("01", chave)
        ) +
        "52040000" +
        "5303986" +
        format("54", valor) +
        "5802BR" +
        format("59", nome) +
        format("60", cidade) +
        "62070503***";

    return payload + crc16(payload);
}

function crc16(payload) {
    function charCodeAt(str, i) {
        return str.charCodeAt(i);
    }
    let polinomio = 0x1021;
    let resultado = 0xFFFF;
    payload = payload + "6304";

    for (let i = 0; i < payload.length; i++) {
        resultado ^= (charCodeAt(payload, i) << 8);
        for (let bit = 0; bit < 8; bit++) {
            if ((resultado <<= 1) & 0x10000) resultado ^= polinomio;
            resultado &= 0xFFFF;
        }
    }
    return "6304" + resultado.toString(16).toUpperCase().padStart(4, '0');
}

function fecharModalErro() {
    document.getElementById('modal-error').style.display = 'none';
}

function processarCompra() {
    if(!document.getElementById('rua').value)
        return alert("Preencha o CEP corretamente.");

    const metodo = document.getElementById('pagamento-metodo').value;
    const btn = document.getElementById('btnConfirmar');

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESSANDO...';
    btn.disabled = true;

    setTimeout(() => {
        if(metodo === 'pix') {
            const valorPix = window.totalBase * 0.95;
            const qrData = gerarPayloadPix(valorPix);
            pixCopiaEColaAtual = qrData;
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}`;

            document.getElementById('pix-qrcode').src = qrUrl;
            document.getElementById('modal-pix').style.display = 'flex';

        } else if (metodo === 'cartao') {
            document.getElementById('modal-error').style.display = 'flex';
        } else {
            exibirSucessoFinal();
        }

        btn.innerHTML = 'CONCLUIR COMPRA';
        btn.disabled = false;
    }, 1500);
}

function confirmarPagamentoPix() {
    const btn = document.getElementById('btnValidarPix');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> VALIDANDO PAGAMENTO...';
    btn.disabled = true;

    setTimeout(() => {
        document.getElementById('modal-pix').style.display = 'none';
        exibirSucessoFinal();
    }, 2500);
}

function exibirSucessoFinal() {
    const orderId = "ES" + Math.floor(Math.random() * 89999 + 10000);
    document.getElementById('res-order-id').innerText = "#" + orderId;
    document.getElementById('modal-success').style.display = 'flex';
}

function finalizarTudo() {
    localStorage.removeItem('eletroShopCart');
    location.href = 'index.html';
}

window.onload = carregarCarrinho;
