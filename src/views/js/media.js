const serieSelecionada = localStorage.getItem("serieSelecionada");
let serieAtual;
let curtidaAtual = null;
const btnLike = document.getElementById("btnLike");
async function buscarSerie() {
  const resposta = await fetch(
    `https://api.tvmaze.com/shows/${serieSelecionada}`,
  );
  const serie = await resposta.json();
  serieAtual = serie;

  const titulo = document.getElementById("titulo");
  titulo.innerText = serie.name;

  const imagem = document.getElementById("imagem");
  if (serie.image == null) {
    imagem.src = "https://via.placeholder.com/210x295?text=Sem+Imagem";
  } else {
    imagem.src = serie.image.original;
  }
  const descricao = document.getElementById("descricao");
  if (serie.summary == null) {
    descricao.innerText = "Sem descrição disponível.";
  } else {
    descricao.innerHTML = serie.summary;
  }

  const genero = document.getElementById("generos");
  genero.innerHTML = serie.genres;
  atualizarBotaoLike();
}



const btnWatchlist = document.getElementById("btnWatchlist");
btnWatchlist.addEventListener("click", () => {
  const id = serieAtual.id;
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));
  let jaAssistiu = false;

  for (let i = 0; i < usuarioLogado.watchlist.length; i++) {
    if (usuarioLogado.watchlist[i] === id) {
      jaAssistiu = true;
      usuarioLogado.watchlist.splice(i, 1); // remove
      location.reload();
      break;
    }
  }

  if (jaAssistiu === false) {
    usuarioLogado.watchlist.push(id); // adiciona
  }

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].email === usuarioLogado.email) {
      usuarios[i].watchlist = usuarioLogado.watchlist;
      location.reload();
      break;
    }
  }
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  console.log(usuarioLogado.watchlist);
});

async function atualizarBotaoLike() {
  const resposta = await fetch("/api/curtidos");

  if (resposta.status === 401) {
    document.getElementById("interacoesUsuario").style.display = "none";
    return;
  }

  const lista = await resposta.json();
  curtidaAtual = null;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].tipo === "serie" && lista[i].id_externo === String(serieAtual.id)) {
      curtidaAtual = lista[i];
    }
  }

  if (curtidaAtual) {
    btnLike.classList.remove("btn-danger");
    btnLike.classList.add("btn-success");
    btnLike.innerHTML = '<i class="bi bi-heart-fill"></i> Curtido';
  } else {
    btnLike.classList.remove("btn-success");
    btnLike.classList.add("btn-danger");
    btnLike.innerHTML = '<i class="bi bi-heart-fill"></i> Curtir';
  }
}



btnLike.addEventListener("click", async () => {
  let resposta;

  if (curtidaAtual) {
    resposta = await fetch(`/api/curtidos/${curtidaAtual.id}`, {
      method: "DELETE",
    });
  } else {
    let poster = null;
    if (serieAtual.image != null) {
      poster = serieAtual.image.original;
    }
    resposta = await fetch("/api/curtidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "serie",
        id_externo: serieAtual.id,
        titulo: serieAtual.name,
        poster: poster,
      }),
    });
  }

  if (resposta.ok) {
    atualizarBotaoLike();
  } else {
    const dados = await resposta.json();
    alert(dados.erro);
  }
});

buscarSerie();