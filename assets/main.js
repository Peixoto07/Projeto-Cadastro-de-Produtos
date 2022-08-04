const dados = {
    id: '8',
    nome: 'pc',
    preco: '100 '
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('dbProduto')) ?? []
const setLocalStorage = (dbProduto) => localStorage.setItem("dbProduto", JSON.stringify(dbProduto))


// *** MÉTODOS: EDITAR, DELETAR E CRIA ***
const editarProduto = (index, produto) => {
    const novoProduto = getLocalStorage()
    novoProduto[index] = produto
    setLocalStorage(novoProduto)
}

const deletaProduto = (index) => {
    const lerProduto = getLocalStorage()
    lerProduto.splice(index, 1)
    setLocalStorage(lerProduto)
}

const criaProduto = (produto) => {
    const dbProduto = getLocalStorage()
    dbProduto.push(produto)
    setLocalStorage(dbProduto)
}

// *** INTERAÇÃO COM USUÁRIO ***

const valorNome = () => document.getElementById('nome').value
const valorPreco = () => document.getElementById('preco').value

const validaForm = () => {
    return valorNome() != "" && valorPreco() != "";
};

const salvaInput = () => {
    const inputValido = validaForm();

    if (!inputValido) {
        return alert("Preencha todos os dados!!!")
    }
    else {
        const produto = {
            nome: valorNome(),
            preco: valorPreco()
        }
        criaProduto(produto);
    }

}

const limpaInput = () => {
    console.log("limpou")
}
// *** EVENTOS ***
document.getElementById('salvar').addEventListener('click', salvaInput);
document.getElementById('limpar').addEventListener('click', limpaInput);
