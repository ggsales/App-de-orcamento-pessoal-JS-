class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this ){
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0 )
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }
    gravar(d){
     let id = this.getProximoId()

     localStorage.setItem(id, JSON.stringify(d))

      localStorage.setItem('id', id )
    }
    //recuperar todas as despesas cadastradas em localstorage
    recuperarTodosRegistros(){
        // array de despesas
        let despesas = Array()
        let id = localStorage.getItem("id")
        for(let i = 1; i<= id; i++){
            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            //verifica se existe a possibilidade de haver indices que foram removidos. E caso existam, será pulado
            if(despesa === null){
                continue
            }
            despesas.push(despesa)
        }
        return despesas
    }
}

let bd = new Bd()



function cadastrarDespesa () {

    let ano = document.getElementById("ano").value
    let mes = document.getElementById("mes").value
    let dia = document.getElementById("dia").value
    let tipo = document.getElementById("tipo").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value



    let despesa = new Despesa(
        ano,
        mes,
        dia,
        tipo,
        descricao,
        valor

    )

    if(despesa.validarDados()){
        //bd.gravar(despesa)
        document.getElementById('modal_titulo_div').className = "modal-header text-success"
        document.getElementById('modal_titulo').innerHTML = "Resgistro cadastrado com sucesso"
        document.getElementById("modal_conteudo").innerHTML="Despesa cadastrada com sucesso"
        document.getElementById("modal_btn").innerHTML = "voltar"
        document.getElementById("modal_btn").className = "btn btn-success"
        $("#modalRegistroDespesa").modal("show")
    } else{
        document.getElementById('modal_titulo').innerHTML = "Erro na inclusão do registro"
        document.getElementById("modal_titulo_div").className= "modal-header text-danger"
        document.getElementById("modal_conteudo").innerHTML="erro na gravação! verifique se todos os campos foram preenchidos corretamente "
        document.getElementById("modal_btn").innerHTML = "voltar e corrigir"
        document.getElementById("modal_btn").className = "btn btn-danger"
        $("#modalRegistroDespesa").modal("show")
    }
    
}


function carregaListaDespesas(){
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()
}

