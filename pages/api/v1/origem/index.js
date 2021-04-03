import { adicionaOrigem, todasOrigem } from '../../../../lib/origem';

export default async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {

        const origem = await todasOrigem();

        console.log(origem);


        res.status(200).json({
            status: 'sucesso',
            origens: origem
        });
    
    } else if(req.method === 'POST') {
        
        const origem = await adicionaOrigem(req);

        if (origem) {
            res.status(200).json({
                status: 'sucesso',
                id: origem.insertId
            });
        } else {
            res.status(203).json({
                status: 'erro',
                msg: 'Não foi possivel salvar.'
            });
        }
    }
}