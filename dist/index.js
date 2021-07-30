"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
dotenv_1.default.config();
const tarefas = [];

app.post('/tarefas', (request, response) => {
    const { nome, descricao } = request.body;
    const dadosTarefa = {
        id: uuid_1.v4(),
        nome,
        descricao,
    };
    tarefas.push(dadosTarefa);
    return response.json({
        dados: dadosTarefa
    });
});

app.put('/tarefas/:id', (request, response) => {
    const { nome, descricao } = request.body;
    const { id } = request.params;
    const indexTarefa = tarefas.findIndex((tarefasAut) => {
        return tarefasAut.id === id;
    });

    tarefas[indexTarefa].nome = nome;
    tarefas[indexTarefa].descricao = descricao;
    return response.json({
        dados: tarefas
    });
});

app.get('/tarefas', (request, response) => {
    return response.json(tarefas);
});

app.get('/tarefas/:id', (request, response) => {
    const { id } = request.params;
    if (!id) {
        return response.status(400).json({
            mensagem: 'Essa tarefa é inválida'
        });
    }
    const buscarTarefas = tarefas.find((tarefa) => tarefa.id == id);
    if (!buscarTarefas) {
        return response.status(404).json({
            mensagem: 'Essa tarefa não existe ainda'
        });
    }
    return response.json({
        buscarTarefas
    });
});

app.delete('/tarefas', (request, response) => {
    const { id } = request.body;
    const buscarTarefas = tarefas.findIndex((tarefa) => tarefa.id == id);
    tarefa.splice(buscarTarefas, 1);
    return response.sendStatus(204);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('API rodando...');
});
