const express = require('express');
const cors = require('cors');
const tarefasRoutes = require('./routes/tarefasRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/tarefas', tarefasRoutes);


app.listen(8080, () => {
    console.log("Servidor rodando no endereço http://localhost:8080");
});