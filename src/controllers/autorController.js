import { autor } from "../models/Autor.js";

class AutorController {

    static async listar (req, res) {
        try {
            const lista = await autor.find({});
            res.status(200).json(lista);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição` });
        }
    }

    static async listarPorId (req, res) {
        try {
            const id = req.params.id;
            const item = await autor.findById(id);

            res.status(200).json(item);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição do autor` });
        }
    }


    static async cadastrar (req, res) {
        try {
            const item = await autor.create(req.body);
            res.status(201).json({ message: "Criado com sucesso ", autor: item });

        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar autor` });
        }       
    }

    static async atualizar (req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);

            res.status(200).json({ message: "Autor atualizado."});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na atualização do autor` });
        }
    }

    static async deletar (req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);

            res.status(200).json({ message: "Autor removido."});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na remoção do autor` });
        }
    }
};

export default AutorController;