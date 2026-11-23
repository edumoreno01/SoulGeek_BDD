const serieSelecionada = localStorage.getItem("serieSelecionada");
let serieAtual;
async function buscarSerie() {
  const resposta = await fetch(
    `https://api.tvmaze.com/search/shows?q=${serieSelecionada}`,
  );
  const dados = await resposta.json();
  const serie = dados[0];
  serieAtual = serie;

  const titulo = document.getElementById("titulo");
  titulo.innerText = serie.show.name;

  const imagem = document.getElementById("imagem");
  if (serie.show.image == null) {
    imagem.src = "https://via.placeholder.com/210x295?text=Sem+Imagem";
  } else {
    imagem.src = serie.show.image.original;
  }
  const descricao = document.getElementById("descricao");
  if (serie.show.summary == null) {
    descricao.innerText = "Sem descrição disponível.";
  } else {
    descricao.innerHTML = serie.show.summary;
  }

  const genero = document.getElementById("generos");
  genero.innerHTML = serie.show.genres;
}



const btnWatchlist = document.getElementById("btnWatchlist");
btnWatchlist.addEventListener("click", () => {
  const id = serieAtual.show.id;
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

const btnLike = document.getElementById("btnLike");

btnLike.addEventListener("click", async () => {
    let poster = null;
  if (serieAtual.show.image != null) {
    poster = serieAtual.show.image.original;
  }
  const resposta = await fetch("/api/curtidos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tipo: "serie",
      id_externo: serieAtual.show.id,
      titulo: serieAtual.show.name,
      poster: poster
    }),
  });

  const dados = await resposta.json();
  if (resposta.ok) {
    btnLike.classList.remove("btn-danger");
    btnLike.classList.add("btn-success");
    btnLike.innerHTML = '<i class="bi bi-heart-fill"></i> Curtido';
  } else {
    alert(dados.erro);
  }
});

buscarSerie();