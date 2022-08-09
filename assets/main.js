function criaProduto() {
    const getArrayProduto = () => JSON.parse(localStorage.getItem('meu_array'))
    
    const novoProduto = {
        
        id: 1,
        arrayProdutos: [],
        

        salvar() {

            const produto = novoProduto.lerDados();
            if (novoProduto.validaCampos(produto)) {
                // console.log(novoProduto.arrayProdutos);
                novoProduto.adicionaNoDB(produto)
                novoProduto.limpaTbody()
                
            }
            // novoProduto.criaLinha()
            novoProduto.atualizaTabela()
            novoProduto.limpar()
        },

        criaLinha(id,nome,preco ){
            const novaLinha = document.createElement('tr')
            novaLinha.innerHTML = `
                <td class="center">${id}</td>
                <td>${nome}</td>
                <td>R$ ${preco}</td>
                <td class="center">
                    <img src="img/editar.png" alt="">
                    <img src="img/deletar.png" alt="">
                </td>
            `
            document.getElementById('corpoTabela').appendChild(novaLinha)
            
        },
        
        atualizaTabela() {
            // novoProduto.limpaTbody()
            getArrayProduto().forEach(novaLinha => 
                novoProduto.criaLinha(novaLinha.id,novaLinha.nome,novaLinha.preco))
                return

        },


        adicionaNoDB(produto) {
            const arrayDB = getArrayProduto() ?? []
            arrayDB.push(produto)
            novoProduto.id++
            // localStorage.meu_array = JSON.stringify(novoProduto.arrayProdutos)
            localStorage.setItem('meu_array', JSON.stringify(arrayDB))
        
            
        },
        


        lerDados() {

            const produto = {}

            produto.id = novoProduto.id;
            produto.nome = document.getElementById('nome').value;
            produto.preco = document.getElementById('preco').value;

            return produto
        },

        validaCampos(produto) {
            if (produto.nome == '' || produto.preco == '') {
                alert("Preencha todos os dados!!!")
                return false
            }
            return true
        },

        limpaTbody (){
            const corpoTabela =document.getElementById('corpoTabela')
            while(corpoTabela.firstChild){
                corpoTabela.removeChild(corpoTabela.lastChild)
            }
        },

        limpar() {
            document.getElementById('nome').value = ''
            document.getElementById('preco').value = ''

        }
    }
    
    atualizaTabela = novoProduto.atualizaTabela
    return novoProduto
    
}

const appCadastro = criaProduto()
atualizaTabela()

