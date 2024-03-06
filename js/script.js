const alunos = [];

function adicionarAlunos() {
    var nome = document.getElementById('nome').value;
    var nota1 = parseInt(document.getElementById('nota1').value);
    var nota2 = parseInt(document.getElementById('nota2').value);
    var nota3 = parseInt(document.getElementById('nota3').value);
    var nota4 = parseInt(document.getElementById('nota4').value);

    // Limita as notas ao máximo de 100
    nota1 = Math.min(nota1, 100);
    nota2 = Math.min(nota2, 100);
    nota3 = Math.min(nota3, 100);
    nota4 = Math.min(nota4, 100);

    let media = (nota1 + nota2 + nota3 + nota4) / 4;
    let situacao = "";

    if (media >= 70) {
        situacao = "<span style='color: green;'>Aprovado</span>";
    } else if (media >= 50 && media < 70) {
        situacao = "<span style='color: yellow;'>Recuperação</span>";
    } else {
        situacao = "<span style='color: red;'>Reprovado</span>";
    }

    var aluno = {
        nome: nome,
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        nota4: nota4,
        situacao: situacao
    };

    alunos.push(aluno);

    if (alunos.length >= 5) {
        criarNovaPagina();
        document.getElementById('adicionarAlunos').style.display = 'none';
    }

    limparCampos();
}

function limparCampos() {
    document.getElementById('nome').value = "";
    document.getElementById('nota1').value = "";
    document.getElementById('nota2').value = "";
    document.getElementById('nota3').value = "";
    document.getElementById('nota4').value = "";
}

function gerarMediaGeral() {
    let totalNotas = 0;
    let quantidadeAlunos = alunos.length;

    for (let i = 0; i < quantidadeAlunos; i++) {
        let aluno = alunos[i];
        totalNotas += (aluno.nota1 + aluno.nota2 + aluno.nota3 + aluno.nota4) / 4;
    }

    let mediaGeral = totalNotas / quantidadeAlunos;
    return mediaGeral.toFixed(2); // Limita a duas casas decimais
}

function criarNovaPagina() {
    // Cria um novo documento HTML
    const novaPagina = document.implementation.createHTMLDocument("Tabela de Alunos");

    // Adiciona o link para o arquivo CSS
    const linkCSS = document.createElement("link");
    linkCSS.rel = "stylesheet";
    linkCSS.type = "text/css";
    linkCSS.href = "css/style.css";
    novaPagina.head.appendChild(linkCSS);

    // Adiciona o conteúdo HTML da tabela ao corpo do novo documento
    novaPagina.body.innerHTML = `
        <div id="resultados">${gerarMediaGeral()}</div>
        <div id="linha">
            <h2>Nome</h2>
            <h2>Nota 1º Bimestre</h2>
            <h2>Nota 2º Bimestre</h2>
            <h2>Nota 3º Bimestre</h2>
            <h2>Nota 4º Bimestre</h2>
            <h2>Situação</h2>
        </div>
        ${alunos.map(aluno => `
            <div class="tabela">
                <div class="retan">${aluno.nome}</div> 
                <div class="retan">${aluno.nota1}</div> 
                <div class="retan">${aluno.nota2}</div> 
                <div class="retan">${aluno.nota3}</div> 
                <div class="retan">${aluno.nota4}</div> 
                <div class="retan">${aluno.situacao}</div> 
            </div>`).join('')}

    <section>
        <div class="caixa">
            <h3>Média Geral</h3>       
            <input type="number" id="mediaGeral" value="${gerarMediaGeral()}" readonly>
        </div>
    </section>`;

    // Abre uma nova janela com o conteúdo da nova página
    const novaJanela = window.open();
    novaJanela.document.write(novaPagina.documentElement.outerHTML);
}
