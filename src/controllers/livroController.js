import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {

    static async listarLivros (req, res) {
        try {
            //const listaLivros = await livro.find({});
            const listaLivros = await livro.find({}).populate("autor").exec();
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição` });
        }
    }

    static async listarLivroPorId (req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);

            res.status(200).json(livroEncontrado);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na requisição do livro` });
        }
    }

    static async cadastrarLivro (req, res) {
        //const body = req.body;

        try {
            // const autorSelecionado = await autor.findById(body.autor);
            // const novo = { ...body, autor: { ... autorSelecionado._doc} };
            // const create = await livro.create(novo);
            const create = await livro.create(req.body);
           
            res.status(201).json({ message: "Criado com sucesso ", livro: create });

        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar livro` });
        }       
    }

    static async atualizarLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);

            res.status(200).json({ message: "Livro atualizado."});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na atualização do livro` });
        }
    }

    static async deletarLivro (req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);

            res.status(200).json({ message: "Livro removido."});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na remoção do livro` });
        }
    }

    static async listarPorEditora (req, res) {
        const editora = req.query.editora;

        try{
            const livrosEditora = await livro.find({ editora })

            res.status(200).json(livrosEditora);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na busca` });
        }
    }
};

export default LivroController;