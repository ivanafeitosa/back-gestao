const express = require('express');
const cors = require('cors');
const tarefasRoutes = require('./routes/tarefasRoutes');
const port = 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API FUNCIONANDO');
})

app.use('/tarefas', tarefasRoutes);


app.listen(port, () => {
    try {
        console.log(`Servidor rodando no endereço http://localhost:${port}`);
    } catch (error) {
        console.log('Erro ao iniciar servidor', error);
    }
});