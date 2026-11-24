const perfilDeslogado = document.getElementById("perfilDeslogado");
const perfilLogado = document.getElementById("perfilLogado");

async function carregarPerfil() {
  const respostaSessao = await fetch("/usuarios/sessao");
  if (!respostaSessao.ok) {
    return;
  }
  const sessao = await respostaSessao.json();

  const respostaUsuario = await fetch("/usuarios/" + sessao.id);
  const usuario = await respostaUsuario.json();

  document.getElementById("nomeUsuario").textContent = usuario.nome;
  document.getElementById("emailUsuario").textContent = usuario.email;

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

carregarPerfil();