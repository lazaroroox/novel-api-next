import { adicionaStatus, todosStatus } from '../../../../lib/status';

export default async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {

        const status = await todosStatus();

        console.log(status);


        res.status(200).json({
            status: 'sucesso',
            data: status
        });
    
    } else if(req.method === 'POST') {
        
        const status = await adicionaStatus(req);

        if (status) {
            res.status(200).json({
                status: 'sucesso',
                id: status.insertId
            });
        } else {
            res.status(203).json({
                status: 'erro',
                msg: 'Não foi possivel salvar.'
            });
        }
    }
}