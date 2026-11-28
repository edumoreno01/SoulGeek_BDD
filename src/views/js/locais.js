async function carregarLocais(tipo, rota) {
  const resposta = await fetch("/api/midias");
  const lista = await resposta.json();

  const section = document.getElementById("locais");
  let achou = false;

  for (let i = 0; i < lista.length; i++) {
    const midia = lista[i];
    if (midia.origem_api !== "local" || midia.tipo !== tipo) {
      continue;
    }
    achou = true;

    const cartao = document.createElement("div");
    cartao.className = "col-6 col-md-4 col-lg-2";

    const a = document.createElement("a");
    a.href = rota + "?id=" + midia.id;
    a.className = "media-card";

    const imagem = document.createElement("img");
    imagem.className = "img-fluid";
    if (midia.poster) {
      imagem.src = midia.poster;
    } else {
      imagem.src = "https://via.placeholder.com/210x295?text=Sem+Imagem";
    }

    const titulo = document.createElement("div");
    titulo.className = "media-title";
    titulo.textContent = midia.titulo;
    if (!midia.poster) {
      titulo.style.opacity = "1";
    }

    a.appendChild(imagem);
    a.appendChild(titulo);
    cartao.appendChild(a);
    section.appendChild(cartao);
  }

  if (!achou) {
    section.innerHTML = '<p class="text-secondary">Nenhum cadastrado ainda.</p>';
  }
}