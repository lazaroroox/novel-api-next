import { verAutorID } from '../../../../lib/autor';

export default async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.query;

    if (req.method === 'GET') {

        const _autor = await verAutorID(id);
        const autor = _autor[0];
        console.log(autor);


        res.status(200).json({
            status: 'sucesso',
            autor: autor
        });
    }
}