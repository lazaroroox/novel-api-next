import excuteQuery from './db';
import moment from 'moment';


const agora = moment().format('YYYY-MM-DD HH:mm:ss');
    


async function _adicionaAvaliacao(req) {

    const { novel, user, avaliacao, comentario } = req.body;

    try {
        const resultado =  excuteQuery({
            query: 'INSERT INTO avaliacao_novel (novel_id, user_id, avaliacao, comentario, criado, atualizado) VALUES(?, ?, ?, ?, ?, ?)',
            values: [novel, user, avaliacao, comentario, agora, agora],
        });
        return resultado;
    } catch (er){
            return er;
        
    }
}

export async function adicionaAvaliacao(req) {

    const { novel } = req.body;

    const avaliacao = await _adicionaAvaliacao(req);
    
    if (await avaliacao.insertId) {
        
        const resultados = await todasAvaliacao(novel);
        var avaliacaos = 0;
        var quantidade = 0;
        //const re = await Promise.all(resultados);
        //console.log(await resultados);
        for (const av of resultados) {
            avaliacaos += av.avaliacao;
            quantidade += 1;
        }
        
        const score = avaliacaos / quantidade;
        
        try {
            const novels = excuteQuery({
                query: 'UPDATE novel SET `avaliacao`=?, `totalAvaliacao`=? WHERE id = ?',
                values: [score, quantidade, novel]
            });
            return novels;
        } catch (er) {
            console.log(er);
            return er;
        }

    }
}

export async function verAvaliacao(id) {

    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `novel_id`, `user_id`, `avaliacao`, `comentario`, `criado`, `atualizado` FROM `avaliacao_novel` WHERE id = ?',
            values: [id]
        });
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function todasAvaliacao(id) {
    try {
        const resultado = excuteQuery({
            query: 'SELECT  `id`, `novel_id`, `user_id`, `avaliacao`, `comentario`, `criado`, `atualizado` FROM `avaliacao_novel` WHERE novel_id = ?',
            values: [id]
        });
        return resultado;

    } catch (error) {
        return false;
    }
}

export async function totalAvaliacao(id) {
    try {
        const resultado = excuteQuery({
            query: 'SELECT COUNT(*) as total FROM `avaliacao_novel` WHERE novel_id = ?',
            values: [id]
        });
        return resultado;

    } catch (error) {
        return false;
    }
}

export async function editarAutor(req, id) {

    const { novel, user, avaliacao, comentario } = req.body;

    try {
        const resultado = excuteQuery({
            query: 'UPDATE autor SET `avaliacao`=?, `comentario`=? `atualizado`=? WHERE id = ? AND novel_id = ? AND user_id = ?',
            values: [avaliacao, comentario, agora, id, novel, user]
        });
        return resultado;
    } catch (error) {
        return false;
    }

}