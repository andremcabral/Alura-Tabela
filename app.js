var valorVitoria = 3;
var valorEmpate = 1;
var valorDerrota = 0;
var jogador1 = { nome: "Jogador_1", vitorias: 3, empates: 1, derrotas: 1, pontos: 0 };
var jogador2 = { nome: "Jogador_2", vitorias: 3, empates: 1, derrotas: 7, pontos: 0 };
var jogador3 = { nome: "Jogador_3", vitorias: 5, empates: 2, derrotas: 3, pontos: 0 };
var jogadores = [jogador1, jogador2, jogador3];
var quantidadeEmpates = 0;
var quantidadeVitorias = 0;
var quantidadeDerrotas = 0;

function executaOperacao() {
    var executar = document.getElementById("operacao").value;
    switch (executar) {
        case "1":
            incluiJogador();
            break;
        case "2":
            limpaTabela();
            break;
        case "3":
            excluiJogador();
            break;
        case "4":
            jogadores = [];
            preencheTabela(jogadores);
            break;
    }
}

function incluiJogador() {
    var nomeNovoJogador = document.getElementById("novoJogador").value;
    if (nomeNovoJogador.length > 2) {
        novoJogador = { nome: nomeNovoJogador, vitorias: 0, empates: 0, derrotas: 0, pontos: 0 }
        jogadores.push(novoJogador);
        document.getElementById("novoJogador").value = "";
    } else {
        alert("Insira um nome de jogador com mais de 2 letras!");
    }
    preencheTabela(jogadores)
}

function limpaTabela() {
    for (var i = 0; i < jogadores.length; i++) {
        jogadores[i].vitorias = 0;
        jogadores[i].empates = 0;
        jogadores[i].derrotas = 0;
        jogadores[i].pontos = 0;
    }
    preencheTabela(jogadores)
}

function excluiJogador() {
    var nomeExcluiJogador = document.getElementById("novoJogador").value;
    var names = jogadores.map(jg => jg.nome); // returns ['frog', 'monkey', 'gorilla', 'lion']
    if (names.includes(document.getElementById("novoJogador").value)) {
        var indiceJogador = names.indexOf(document.getElementById("novoJogador").value);
        jogadores.shift(indiceJogador);
        preencheTabela(jogadores);
        alert("Jogador " + nomeExcluiJogador + " excluído")
    } else {
        alert("Jogador não encontrado")
    }
}

function calculaPlacar(jogador) {
    var pontosDerrota;
    if (valorDerrota != 0) { pontosDerrota = jogador.derrotas * valorDerrota; } else { pontosDerrota = 0 }
    var total = jogador.vitorias * valorVitoria +
        jogador.empates * valorEmpate +
        pontosDerrota;
    return total;
}

function atualizaPesos() {
    valorVitoria = parseInt(document.getElementById("valorVitoria").value);
    valorEmpate = parseInt(document.getElementById("valorEmpate").value);
    valorDerrota = parseInt(document.getElementById("valorDerrota").value);
    preencheTabela(jogadores);
}

function adicionarVitoria(i) {
    jogadores[i].vitorias++;
    preencheTabela(jogadores);
}

function adicionarEmpate(i) {
    jogadores[i].empates++;
    preencheTabela(jogadores);
}

function adicionarDerrota(i) {
    jogadores[i].derrotas++;
    preencheTabela(jogadores);
}

function preencheTabela(jogadores) {
    var pessoaJogador = "";
    var maximoPontos = 0;
    for (var i = 0; i < jogadores.length; i++) {
        jogadores[i].pontos = calculaPlacar(jogadores[i]);
        if (jogadores[i].pontos > maximoPontos) {
            maximoPontos = jogadores[i].pontos
            document.getElementById('vencedor').innerHTML = "Primeiro colocado: " + jogadores[i].nome
        }
        pessoaJogador += "<tr><td>" + jogadores[i].nome + "</td>";
        pessoaJogador += "<td>" + jogadores[i].vitorias + "</td>";
        pessoaJogador += "<td>" + jogadores[i].empates + "</td>";
        pessoaJogador += "<td>" + jogadores[i].derrotas + "</td>";
        pessoaJogador += "<td>" + jogadores[i].pontos + "</td>";
        pessoaJogador += "<td><button onClick='adicionarVitoria(" + i + ")'>Vitória</button></td>";
        pessoaJogador += "<td><button onClick='adicionarEmpate(" + i + ")'>Empate</button></td>";
        pessoaJogador += "<td><button onClick='adicionarDerrota(" +
            i +
            ")'>Derrota</button></td></tr>";
    }
    var tabelaJogadores = document.getElementById("tabelaJogadores");
    tabelaJogadores.innerHTML = pessoaJogador;
    confereValores();
}

function confereValores() {
    quantidadeVitorias = 0
    quantidadeEmpates = 0
    quantidadeDerrotas = 0
    for (var i = 0; i < jogadores.length; i++) {
        quantidadeVitorias += jogadores[i].vitorias
        quantidadeEmpates += jogadores[i].empates
        quantidadeDerrotas += jogadores[i].derrotas
    }
    if ((quantidadeVitorias != quantidadeDerrotas) || (quantidadeEmpates % 2) != 0) {
        document.getElementById('alertas').innerHTML = "A quantidade de vitórias/derrotas ou empates não estão corretas"
    } else {
        document.getElementById('alertas').innerHTML = ""
    }
}

preencheTabela(jogadores);