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

buscarFilme();