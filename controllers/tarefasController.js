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
        res.send("Produto não encontrado.");
    }
};

//POST

const escreverDados = (tarefas) => {
    fs.writeFileSync(path.join(__dirname, '../data/tarefas.json'), JSON.stringify(tarefas), 'utf-8')
};

const postTarefas = (req, res) => {
    const novaTarefa = req.body;
    tarefas.push(novaTarefa);
    escreverDados(tarefas);
    res.send(novaTarefa);
};

//PUT

const putTarefas = (req, res) => {
    const idParams = req.params.id;

    const buscaTarefa = tarefas.findIndex(tarefa => tarefa.id == idParams);
    if(buscaTarefa !== -1) {
        const tarefaAtualizada = req.body;
        tarefas[buscaTarefa] = tarefaAtualizada;
        escreverDados(tarefas);
        res.send(tarefaAtualizada);
    }
};

//DELETE

const deleteTarefas = (req, res) => {
    const idParams = req.params.id;
    const tarefasAtualizado = tarefas.filter(tarefa => tarefa.id != idParams);
    escreverDados(tarefasAtualizado);
    res.send(tarefasAtualizado);
};


module.exports = {
    getTarefas,
    getTarefa,
    postTarefas,
    putTarefas,
    deleteTarefas
}