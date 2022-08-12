function criaProduto() {
    const getArrayProduto = () => JSON.parse(localStorage.getItem('meu_array'))
    const setArrayProduto = (arrayDB) => localStorage.setItem('meu_array', JSON.stringify(arrayDB))
    const card = document.getElementById('card')
    const corpoTabela = document.getElementById('corpoTabela')
    const botaoSalvar = document.getElementById('salvar')
    const botaoLimpar = document.getElementById('limpar')
    const valueNome = document.getElementById('nome')
    const valuePreco = document.getElementById('preco')
    function removeOuAddModal(metodo, card, botaoSalvar, botaoLimpar) {
        if (metodo == 'remove') {
            card.classList.remove('modalCard') == 'removeCard';
            botaoSalvar.classList.remove('atualizar') == 'removeSalvar';
            botaoLimpar.classList.remove('cancelar') == 'removeLimpar';
            return
            'removeCard', 'removeSalvar', 'removeLimpar'
        }

        card.classList.add('modalCard') == 'addCard',
            botaoSalvar.classList.add('atualizar') == 'addSalvar',
            botaoLimpar.classList.add('cancelar') == 'addLimpar'
        return
        'addCard,addSalvar,removeLimpar'
    }

    const vereficaDB = () => {
        if (localStorage.meu_array == 'null') {
            localStorage.meu_array = []
        }
        return vereficaDB()
    }

    function newID() {
        if (localStorage.meu_array && localStorage.meu_array != '[]' && localStorage.meu_array != 'null') {
            id = getArrayProduto()[getArrayProduto().length - 1].id + 1
            return id;
        }

        return id = 1;
    }

    // *** INICIO APP *** //

    const novoProduto = {
        id: newID(),
        editId: null,
        arrayProdutos: [],


        salvar() {
            const produto = novoProduto.lerDados();

            if (novoProduto.validaCampos(produto)) {
                if (novoProduto.editId == null) {
                    novoProduto.adicionaNoDB(produto)
                } else {
                    novoProduto.botaoAtualizar(novoProduto.editId)
                }
                novoProduto.limpaTbody()
                novoProduto.atualizaTabela()
            }

            novoProduto.limparCampos()
        },

        criaLinha(id, nome, preco) {
            const novaLinha = document.createElement('tr')
            novaLinha.innerHTML = `
                <td class="center">${id}</td>
                <td>${nome}</td>
                <td>R$ ${preco}</td>
                <td class="center">
                    <input class = "buttonAcoes" onclick="appCadastro.editar(${id})" type="image" src="img/editar.png"/>
                    <input class = "buttonAcoes" onclick="appCadastro.deletar(${id})" type="image" src="img/deletar.png"/>
                    
                </td>
            `
            corpoTabela.appendChild(novaLinha)

        },

        atualizaTabela() {
            // novoProduto.limpaTbody()
            if (localStorage.meu_array) {
                getArrayProduto().forEach(novaLinha =>
                    novoProduto.criaLinha(novaLinha.id, novaLinha.nome, novaLinha.preco))
            }

        },

        adicionaNoDB(produto) {
            produto.preco = parseFloat(produto.preco).toFixed(2)
            const arrayDB = getArrayProduto() ?? []
            arrayDB.push(produto)
            novoProduto.id++
            setArrayProduto(arrayDB)

        },

        lerDados() {

            const produto = {}

            produto.id = novoProduto.id;
            produto.nome = valueNome.value;
            produto.preco = valuePreco.value;

            return produto
        },

        validaCampos(produto) {
            if (produto.nome == '' || produto.preco == '') {
                alert("Preencha todos os dados!!!")
                return false
            }
            return true
        },

        limpaTbody() {

            while (corpoTabela.firstChild) {
                corpoTabela.removeChild(corpoTabela.lastChild)
            }
        },

        limparCampos() {
            valueNome.value = ''
            valuePreco.value = ''
            if (card.className == "card modalCard") {
                removeOuAddModal('remove', card, botaoSalvar, botaoLimpar)
                botaoSalvar.innerText = 'Salvar'
                botaoLimpar.innerText = 'Limpar'
                novoProduto.editId = null
            }
        },

        botaoAtualizar(id) {
            const arrayDB = getArrayProduto()

            for (let i = 0; i < arrayDB.length; i++) {
                if (arrayDB[i].id == id) {
                    arrayDB[i].nome = valueNome.value
                    arrayDB[i].preco = parseFloat(valuePreco.value).toFixed(2)
                    setArrayProduto(arrayDB)
                }
            }
        },

        editar(id, i) {
            const arrayDB = getArrayProduto()

            for (let i = 0; i < arrayDB.length; i++) {
                if (arrayDB[i].id == id) {
                    novoProduto.editId = id
                    removeOuAddModal('add', card, botaoSalvar, botaoLimpar)
                    valueNome.value = arrayDB[i].nome
                    valuePreco.value = arrayDB[i].preco
                    botaoSalvar.innerText = 'Atualizar'
                    botaoLimpar.innerText = 'Cancelar'                
                }
            }
        },

        deletar(id, i) {
            const arrayDB = getArrayProduto()

            for (let i = 0; i < arrayDB.length; i++) {
                if (arrayDB[i].id == id) {
                    arrayDB.splice(i, 1)
                    corpoTabela.deleteRow(i)
                    setArrayProduto(arrayDB)
                    arrayDB.length < 1 ? location.reload() : {}

                }
            }
        },
    }

    atualizaTabela = novoProduto.atualizaTabela
    return novoProduto

}

const appCadastro = criaProduto()
appCadastro.atualizaTabela()


