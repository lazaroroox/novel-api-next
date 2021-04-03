import { adicionaTag, todasTag } from '../../../../lib/tag';

export default async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {

        const tag = await todasTag();

        console.log(tag);


        res.status(200).json({
            status: 'sucesso',
            tags: tag
        });
    
    } else if(req.method === 'POST') {
        
        const tag = await adicionaTag(req);

        if (tag) {
            res.status(200).json({
                status: 'sucesso',
                id: tag.insertId
            });
        } else {
            res.status(203).json({
                status: 'erro',
                msg: 'Não foi possivel salvar.'
            });
        }
    }
}