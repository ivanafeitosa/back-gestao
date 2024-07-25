const fs = require('fs');
const tarefas = require("../data/tarefas.json");
const path = require('path');

//GET
const getTarefas = (req, res) => {
    res.send(tarefas);
};

const getTarefa = (req, res) => {
    const indiceTarefa = req.params.id;

    const tarefaSolicitada = tarefas.find(tarefa => tarefa.id == indiceTarefa);

    if(tarefaSolicitada) {
        res.send(tarefaSolicitada);
    } else {
        res.status(404).send("Tarefa não encontrada.");
    }
};

//POST

const escreverDados = (tarefas) => {
    fs.writeFileSync(path.join(__dirname, '../data/tarefas.json'), JSON.stringify(tarefas), 'utf-8')
};

const postTarefas = (req, res) => {
    const {nomeResponsavel, descricao, status, dataCriacao } = req.body;

    const obterNovoId = () => {
        let maiorId = 0;
        tarefas.forEach(tarefa => {
            if (tarefa.id > maiorId) {
                maiorId = tarefa.id;
            }
        });
        return maiorId + 1;
    }

    //verificacao das info do body
    const novaTarefa = {
        id: tarefas.length ? obterNovoId() : 1,
        nomeResponsavel,
        dataCriacao: dataCriacao || new Date(),
        descricao,
        status: status || 'pendente'
    }

    tarefas.push(novaTarefa);
    escreverDados(tarefas);
    res.status(201).send(novaTarefa);
};

//PUT

const putTarefas = (req, res) => {
    const idParams = req.params.id;

    const buscaTarefa = tarefas.findIndex(tarefa => tarefa.id == idParams);
    if(buscaTarefa !== -1) {
        
        const {nomeResponsavel, descricao, status, dataCriacao} = req.body;
        const atualTarefa = {
            id: parseInt(idParams),
            nomeResponsavel,
            dataCriacao: dataCriacao || new Date(),
            descricao,
            status: status || 'pendente'
        }

        tarefas[buscaTarefa] = atualTarefa;
        escreverDados(tarefas);
        res.status(200).send(atualTarefa);
    } else {
        res.status(404).send("Tarefa não encontrada")
    }
};

//DELETE

const deleteTarefas = (req, res) => {
    const idParams = req.params.id;
    const tarefasAtualizado = tarefas.filter(tarefa => tarefa.id != idParams);
    escreverDados(tarefasAtualizado);
    res.status(204).send();
};


module.exports = {
    getTarefas,
    getTarefa,
    postTarefas,
    putTarefas,
    deleteTarefas
}