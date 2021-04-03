import { adicionaAutor, todosAutor } from '../../../../lib/autor';

export default async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {

        const autores = await todosAutor();

        console.log(autores);


        res.status(200).json({
            status: 'sucesso',
            autores: autores
        });
    
    } else if(req.method === 'POST') {
        
        const autor = await adicionaAutor(req);

        if (autor) {
            res.status(200).json({
                status: 'sucesso',
                id: autor.insertId
            });
        } else {
            res.status(203).json({
                status: 'erro',
                msg: 'Não foi possivel salvar.'
            });
        }
    }
}