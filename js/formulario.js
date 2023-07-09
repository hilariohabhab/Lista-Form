form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Restante do código para processar os dados do formulário

  const form = document.getElementById("novoItem");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const quantidade = document.getElementById("quantidade-excluir").value;

    // Verifica se o LocalStorage é suportado pelo navegador
    if (typeof Storage !== "undefined") {
      // Cria um objeto com as informações do formulário
      const item = {
        nome: nome,
        quantidade: quantidade,
      };

      // Salva o objeto no LocalStorage como uma string JSON
      localStorage.setItem("itemFormulario", JSON.stringify(item));

      // Limpa os campos do formulário
      document.getElementById("nome").value = "";
      document.getElementById("quantidade-excluir").value = "";

      // Exibe uma mensagem de sucesso
      alert("As informações foram salvas.");
    } else {
      // Caso o LocalStorage não seja suportado
      alert(
        "Desculpe, o seu navegador não suporta o recurso de armazenamento local."
      );
    }
  });
});