import { adicionaAvaliacao } from '../../../../lib/avaliacao';

export default async (req, res) => {

    if (req.method === "POST") {
        const avaliacao = await adicionaAvaliacao(req);

        if (avaliacao) {
            res.status(200).json({
                status: 'sucesso',
                id: avaliacao
            });
        } else {
            res.status(203).json({
                status: 'erro',
                msg: 'Não foi possivel salvar.'
            });
        }
    }

}