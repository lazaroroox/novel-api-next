import { adicionarNovel, verNovel, editarNovel, novelItem, todosNovel } from '../../../../lib/novel';

export default async (req, res) => {


    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'POST') {
            
        const { titulo } = req.body;
        console.log(titulo);
        const novel = await adicionarNovel(req);

        console.log(novel.insertId);
        if (novel) {
            res.status(200).json({
                status: 'sucesso',
                id: novel.insertId
            })
        } else {
            res.status(203).json({
                status: 'erro',
                msg: 'Não foi possivel salvar.'
            })
        }
    } else if (req.method === "GET") {
        const novel = await todosNovel();


        const resultado = [];

        for (const final of novel) {
            const ff = await novelItem(final);
            resultado.push(ff);
        }

        res.status(200).json({
            status: 'sucesso',
            data: resultado
        });

    } else {
        res.status(203).json({
            status: 'erro',
            req: req.method
        })
    }
}