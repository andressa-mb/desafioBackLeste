const mongoose = require("mongoose");

const ContatoSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    email: {type: String, required: true},
    genero: {type: String, required: true},
    linguagem: {type: String, required: true},
    avatar: {type: String, required: true},
    dataNascimento: {
        type: Date,
        required: true,
        validate: {
            validator: function(value){
                return value && value < Date.now();
            },
            message: "Data de Nascimento deve ser uma data válida no passado"
        }
    }
});

const ContatoModel = mongoose.model('contatos', ContatoSchema);

module.exports = ContatoModel;