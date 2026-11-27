const FilmeSelecionado = localStorage.getItem("FilmeSelecionado");
let filmeAtual;
let curtidaAtual = null;
const btnLike = document.getElementById("btnLike");

async function buscarFilme() {
  const resposta = await fetch(
    `http://www.omdbapi.com/?i=${FilmeSelecionado}&apikey=11b03a97`,
  );
  const filme = await resposta.json();
  filmeAtual = filme;

  document.getElementById("titulo").innerText = filme.Title;

  const imagem = document.getElementById("imagem");
  if (filme.Poster == "N/A") {
    imagem.src = "https://via.placeholder.com/210x295?text=Sem+Imagem";
  } else {
    imagem.src = filme.Poster;
  }

  const descricao = document.getElementById("descricao");
  if (filme.Plot == "N/A") {
    descricao.innerText = "Sem descrição disponível.";
  } else {
    descricao.innerText = filme.Plot;
  }

  document.getElementById("generos").innerHTML = filme.Genre;
  atualizarBotaoLike();
}

async function atualizarBotaoLike() {
  const resposta = await fetch("/api/curtidos");

  if (resposta.status === 401) {
    document.getElementById("interacoesUsuario").style.display = "none";
    return;
  }

  const lista = await resposta.json();
  curtidaAtual = null;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].tipo === "filme" && lista[i].id_externo === String(filmeAtual.imdbID)) {
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
    if (filmeAtual.Poster != "N/A") {
      poster = filmeAtual.Poster;
    }
    resposta = await fetch("/api/curtidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "filme",
        id_externo: filmeAtual.imdbID,
        titulo: filmeAtual.Title,
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

buscarFilme();
