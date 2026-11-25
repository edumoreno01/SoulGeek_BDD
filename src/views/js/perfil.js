const perfilDeslogado = document.getElementById("perfilDeslogado");
const perfilLogado = document.getElementById("perfilLogado");
let idUsuario;
async function carregarPerfil() {
  const respostaSessao = await fetch("/usuarios/sessao");
  if (!respostaSessao.ok) {
    return;
  }
  const sessao = await respostaSessao.json();
idUsuario = sessao.id;
  const respostaUsuario = await fetch("/usuarios/" + sessao.id);
  const usuario = await respostaUsuario.json();

  document.getElementById("nomeUsuario").textContent = usuario.nome;
  document.getElementById("emailUsuario").textContent = usuario.email;
  document.getElementById("editarNome").value = usuario.nome;
document.getElementById("editarEmail").value = usuario.email;

  perfilDeslogado.style.display = "none";
  perfilLogado.style.display = "block";

  carregarCurtidos();
}

function criarCartao(midia) {
  let imagemSrc = midia.poster;
  if (!imagemSrc) {
    imagemSrc = "https://via.placeholder.com/210x295?text=Sem+Imagem";
  }

  let link = "/midias";
  if (midia.tipo === "filme") {
    link = "/detalhes-filme";
  }

  const cartao = document.createElement("div");
  cartao.className = "col-6 col-md-4 col-lg-2";

  const a = document.createElement("a");
  a.href = link;
  a.className = "media-card";
  a.addEventListener("click", () => {
  if (midia.tipo === "filme") {
    localStorage.setItem("FilmeSelecionado", midia.id_externo);
  } else {
    localStorage.setItem("serieSelecionada", midia.id_externo);
  }
});

  const imagem = document.createElement("img");
  imagem.className = "img-fluid";
  imagem.src = imagemSrc;

  const titulo = document.createElement("div");
  titulo.className = "media-title";
  titulo.textContent = midia.titulo;
  if (!midia.poster) {
    titulo.style.opacity = "1";
  }

  a.appendChild(imagem);
  a.appendChild(titulo);
  cartao.appendChild(a);
  return cartao;
}

async function carregarCurtidos() {
  const resposta = await fetch("/api/curtidos");
  const lista = await resposta.json();

  document.getElementById("qtdCurtidos").textContent = lista.length;

  const section = document.getElementById("listaCurtidos");
  for (let i = 0; i < lista.length; i++) {
    section.appendChild(criarCartao(lista[i]));
  }
}

const btnSalvarEdicao = document.getElementById("btnSalvarEdicao");

btnSalvarEdicao.addEventListener("click", async () => {
  const nome = document.getElementById("editarNome").value;
  const email = document.getElementById("editarEmail").value.toLowerCase();
  const senha = document.getElementById("editarSenha").value;
  const confirmacao = document.getElementById("editarConfirmacaoSenha").value;

  if (!nome || !email) {
    alert("Preencha nome e e-mail");
    return;
  }
  if (!document.getElementById("editarEmail").checkValidity()) {
    alert("Digite um e-mail válido.");
    return;
  }
  if (senha !== confirmacao) {
    alert("As senhas não conferem");
    return;
  }
  if (senha !== "" && senha.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres");
    return;
  }

  const corpo = { nome, email };
  if (senha !== "") {
    corpo.senha = senha;
  }

  const resposta = await fetch("/usuarios/" + idUsuario, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  });

  const dados = await resposta.json();
  if (resposta.ok) {
    alert("Conta atualizada!");
    location.reload();
  } else {
    alert(dados.erro);
  }
});

const btnExcluirConta = document.getElementById("btnExcluirConta");

btnExcluirConta.addEventListener("click", async () => {
  const confirmado = confirm("Tem certeza? Essa ação não pode ser desfeita.");
  if (!confirmado) {
    return;
  }

  const resposta = await fetch("/usuarios/" + idUsuario, {
    method: "DELETE",
  });

  if (resposta.ok) {
    alert("Conta excluída.");
    location.href = "/";
  } else {
    const dados = await resposta.json();
    alert(dados.erro);
  }
});

carregarPerfil();