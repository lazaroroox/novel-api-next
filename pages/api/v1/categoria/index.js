import { adicionarCategoria, todasCategoria } from '../../../../lib/categoria';

export default async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {

        const categorias = await todasCategoria();

        console.log(categorias);


        res.status(200).json({
            status: 'sucesso',
            categorias: categorias
        });
    
    } else if(req.method === 'POST') {
        
        const categoria = await adicionarCategoria(req);

        if (categoria) {
            res.status(200).json({
                status: 'sucesso',
                id: categoria.insertId
            });
        } else {
            res.status(203).json({
                status: 'erro',
                msg: 'Não foi possivel salvar.'
            });
        }
    }
}