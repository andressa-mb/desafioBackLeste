const express = require('express');
const ContatoModel = require('./model/contato.model');
const cors = require('cors');
const mongoose = require('./config/mongo');

const app = express();
mongoose();

app.use(express.json());
app.use(cors({}));

app.get('/contatos', async (req, res) => {
    console.log("GET");
    try{
        const contatos = await ContatoModel.find();
        res.status(200).json(contatos);
    }catch(error){
        res.status(500).json({error: "Erro ao buscar contatos."});
    }
   
})

app.post('/contatos', async (req, res) => {
    console.log("POST");
    const {nome, sobrenome, email, genero, linguagem, avatar, dataNascimento} = req.body;

    if(!nome){
        return res.status(400).json({error: "Nome não pode estar vazio."});
    }
    if(!sobrenome){
        return res.status(400).json({error: "Sobrenome não pode estar vazio."});
    }
    if(!telefone){
        return res.status(400).json({error: "Telefone não pode estar vazio."});
    }
    if(!dataNascimento){
        return res.status(400).json({error: "Data de Nascimento não pode estar vazio."});
    }
    if(!genero){
        return res.status(400).json({error: "Gênero não pode estar vazio."});
    }
    if(!endereco){
        return res.status(400).json({error: "Endereço não pode estar vazio."});
    }
    if(!nacionalidade){
        return res.status(400).json({error: "Nacionalidade não pode estar vazio."});
    }

    try{
        const novoContato = new ContatoModel({nome, sobrenome, email, genero, linguagem, avatar, dataNascimento});
        await novoContato.save();
        res.status(201).json(novoContato);
    }catch(error){
        res.status(500).json({error: "Erro ao salvar o contato", details: error.message});
    }

    console.log("Enviando os dados");
        
})

app.put('/contatos/:id', async (req, res) => {
    const {id} = req.params;
    const {nome, sobrenome, email, genero, linguagem, avatar, dataNascimento} = req.body;

    try{   
        const updateContato = await ContatoModel.updateOne({_id: id}, {nome, sobrenome, email, genero, linguagem, avatar, dataNascimento}, {new: true})
        if(!updateContato){
            res.status(404).send("Contato não encontrado.")
        };
        return res.status(200).json(updateContato);
    } catch(error) {
        res.status(500).send(error);
    }
})

app.delete('/contatos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteContato = await ContatoModel.deleteOne({ _id: id });
      
        return res.status(200).json(deleteContato);
    } catch (error) {
        console.error("Erro ao excluir contato", error);
        res.status(500).send(error);
    }
})


app.listen(8080, () => {
    console.log("Servidor funcionando na porta 8080");
})
