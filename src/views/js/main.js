const btnCadastro = document.getElementById("btnCadastro");
btnCadastro.addEventListener("click", async () => {
  const nome = document.getElementById("cadastroNome").value;
  const email = document.getElementById("cadastroEmail").value.toLowerCase();;
  const senha = document.getElementById("cadastroSenha").value;
  const confirmacaoSenha = document.getElementById(
    "cadastroConfirmacaoSenha",
  ).value;

  if (!nome || !email || !senha || !confirmacaoSenha) {
    alert("Preencha todos os campos");
    return;
  }
  if (senha !== confirmacaoSenha) {
    alert("As senhas não conferem");
    return;
  }
  if (senha.length < 6) {
    alert("A senha deve conter pelo menos 6 caracteres.");
    return;
  }
  if (!document.getElementById("cadastroEmail").checkValidity()) {
    alert("Digite um email válido.");
    return;
  }

  const resposta = await fetch("/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, email, senha }),
  });

  const dados = await resposta.json();
  if (resposta.ok) {
    await fetch("/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    alert("Conta criada!");
    const modalEl = document.getElementById("SignIn");
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.hide();
    location.reload();
  } else {
    alert(dados.erro);
  }
});

const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value.toLowerCase();
  const senha = document.getElementById("loginSenha").value;

  if (!email || !senha) {
    alert("Preencha email e senha");
    return;
  }

  const resposta = await fetch("/usuarios/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  const dados = await resposta.json();
  if (resposta.ok) {
    const modalEl = document.getElementById("Login");
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.hide();
      location.reload()

  } else {
    alert(dados.erro);
  }
});

function mostrarPerfil(usuarioLogado) {
  document.getElementById("areaUsuario").innerHTML = `
    <button id="btnSair" class="btn btn-outline-light d-flex align-items-center gap-2 border-2" onclick="sair()">
      <i class="bi bi-box-arrow-right"></i>
      Sair
    </button>
    <a href="/perfil" class="btn btn-outline-light d-flex align-items-center gap-2 border-2">
      <i class="bi bi-person-circle"></i>
      ${usuarioLogado.nome}
    </a>
  `;
  const btnComecarAgora = document.getElementById("btnComecarAgora");
  if (btnComecarAgora) {
    btnComecarAgora.style.display = "none";
  }
}

async function verificarSessao() {
  const resposta = await fetch("/usuarios/sessao");

  if (resposta.ok) {
    const usuario = await resposta.json();
    mostrarPerfil(usuario);
  }
}
verificarSessao();
async function sair() {
  await fetch("/usuarios/logout", { method: "POST" });
  location.reload();
}



// TEMA CLARO/ESCURO
const checkbox = document.getElementById("btnClaroEscuro");

if (checkbox) {
  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    checkbox.checked = true;
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    checkbox.checked = false;
  }

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("tema", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("tema", "dark");
    }
  });
}
