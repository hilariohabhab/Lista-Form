const form = document.getElementById("novoItem");
const nomeInput = document.getElementById("nome");
const quantidadeInput = document.getElementById("quantidade-excluir");
const lista = document.querySelector(".lista");

const atualizarMaxQuantidade = () => {
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    const quantidadeExcluirInput = item.querySelector(".quantidade-excluir");
    const strongElement = item.querySelector("strong");
    const quantidadeAtual = parseInt(strongElement.textContent);
    quantidadeExcluirInput.max = quantidadeAtual;
  });
};

const adicionarItem = (nome, quantidade) => {
  const novoItem = document.createElement("li");
  novoItem.classList.add("item");
  novoItem.innerHTML = `
    <strong>${quantidade}</strong>
    <div class="opcoes">
      <label for="quantidade-excluir">${nome}</label>
      <button class="edit">Editar</button>
      <button class="delete">Excluir</button>
      <input type="number" class="quantidade-excluir" min="1" step="1" placeholder="Quantidade" max="${quantidade}">
    </div>
  `;

  lista.appendChild(novoItem);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = nomeInput.value;
  const quantidade = quantidadeInput.value;

  if (nome.trim() === "" || quantidade.trim() === "") {
    alert("Por favor, preencha todos os campos");
  } else {
    adicionarItem(nome, quantidade);

    nomeInput.value = "";
    quantidadeInput.value = "";

    atualizarMaxQuantidade();

    const listaAdicionada = lista.innerHTML;
    localStorage.setItem("listaAdicionada", listaAdicionada);
  }
});

lista.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    const item = event.target.closest(".item");
    const quantidadeExcluirInput = item.querySelector(".quantidade-excluir");
    const quantidadeExcluir = parseInt(quantidadeExcluirInput.value);

    if (quantidadeExcluir > 0) {
      const strongElement = item.querySelector("strong");
      const quantidadeAtual = parseInt(strongElement.textContent);

      if (quantidadeExcluir >= quantidadeAtual) {
        item.remove();
      } else {
        strongElement.textContent = quantidadeAtual - quantidadeExcluir;
      }

      atualizarMaxQuantidade();
      const listaAdicionada = lista.innerHTML;
      localStorage.setItem("listaAdicionada", listaAdicionada);
    } else {
      alert("A quantidade mínima para exclusão é 1");
    }
  } else if (event.target.classList.contains("edit")) {
    const item = event.target.closest(".item");
    const label = item.querySelector("label");
    const nomeAntigo = label.textContent;
    const novoNome = prompt("Digite o novo nome do item:", nomeAntigo);

    if (novoNome && novoNome.trim() !== "") {
      label.textContent = novoNome.trim();
      const listaAdicionada = lista.innerHTML;
      localStorage.setItem("listaAdicionada", listaAdicionada);
    }
  }
});

window.addEventListener("load", () => {
  if (localStorage.getItem("listaAdicionada")) {
    lista.innerHTML = localStorage.getItem("listaAdicionada");
    lista.classList.remove("oculta");
  }
  atualizarMaxQuantidade();
});
