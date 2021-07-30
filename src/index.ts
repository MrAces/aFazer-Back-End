import express, { Request, Response } from 'express';
import { v4 as uuidGenerator } from 'uuid';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

dotenv.config();

const tarefas: Array <any> = [];

app.post('/tarefas', (request: Request, response: Response) => {
    const { nome, descricao } = request.body;
    
    const descricaoTarefas = { 
        id: uuidGenerator(),
        nome,
        descricao,
    }

    tarefas.push(descricaoTarefas);
        
    return response.json({
        dados: descricaoTarefas
    });
});

app.put('/tarefas/:id', (request: Request, response: Response) => {
    const { nome, descricao } = request.body;
    const { id } = request.params;

    const indexTarefa = tarefas.findIndex((tarefasAut) => {
        return tarefasAut.id === id
    });
    
    tarefas[indexTarefa].nome = nome;
    tarefas[indexTarefa].descricao = descricao;

    return response.json({
     dados: tarefas
    });
});

app.get('/tarefas', (request: Request, response: Response) => {
    return response.json(tarefas);
});

app.get('/tarefas/:id', (request: Request, response: Response) => {
    const { id } = request.params;

    if (!id) {
        return response.status(400).json({
            mensagem: 'Essa tarefa é inválida'
        });
    }
    
    const buscarTarefas = tarefas.find((recado: any) => recado.id == id);

    if (!buscarTarefas) {
        return response.status(404).json({
            mensagem: 'Essa tarefa não existe ainda'
        });
    }

    return response.json({
        buscarTarefas
    });
});

app.delete('/tarefas', (request: Request, response: Response) => {
    
    const { id } = request.body;
    
    const buscarTarefas = tarefas.findIndex((recado: any) => recado.id == id);
    tarefas.splice(buscarTarefas, 1);
    
    return response.sendStatus(204);
});

const port = process.env.PORT || 8080;


app.listen(port, () => {
    console.log('API rodando...');
});