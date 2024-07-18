const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefasController');

router.get('/', tarefasController.getTarefas);

router.get('/:id', tarefasController.getTarefa);

router.post('/', tarefasController.postTarefas);

router.put('/:id', tarefasController.putTarefas);

router.delete('/:id', tarefasController.deleteTarefas);

module.exports = router;