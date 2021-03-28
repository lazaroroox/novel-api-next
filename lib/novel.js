import excuteQuery from './db';
import moment from 'moment';


const agora = moment().format('YYYY-MM-DD HH:mm:ss');
    
export async function adicionarNovel(req) {

    const { titulo, slug, descricao, autor, tipo, origem, status } = req.body;
    try {
        const result =  excuteQuery({
            query: 'INSERT INTO novel (titulo, slug, descricao, autor, tipo, origem, status, criadoEm, atualizadoEm) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
            values: [titulo, slug, descricao, autor, tipo, origem, status, agora, agora],
        });    
        return result;
    } catch (error) {
        return false;
    }
}

export async function verNovel(slug) {

    try {
        const result = excuteQuery({
            query: 'SELECT `id`, `titulo`, `slug`, `descricao`, `autor`, `tipo`, `origem`, `status`, `avalicao`, `visualizacao`, `criadoEm`, `atualizadoEm` FROM `novel` WHERE slug = ?',
            values: [slug],
        });
        return result;
    } catch (error) {
        return false;
    }
}

export async function editarNovel(req, id) {

    const { titulo, slug, descricao, autor, tipo, origem, status } = req.body;

    try {
        const resultado = excuteQuery({
            query: 'UPDATE novel SET `titulo`=?, `slug`=?, `descricao`=?, `autor`=?, `tipo`=?, `origem`=?, `status`=?, `atualizadoEm`=? WHERE id = ?',
            values: [titulo, slug, descricao, autor, tipo, origem, status, agora, id]
        });
        return resultado;
    } catch (error) {
        return false;
    }

}