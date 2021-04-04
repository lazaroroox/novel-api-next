import excuteQuery from './db';
import moment from 'moment';
import slugify from 'slugify';

const agora = moment().format('YYYY-MM-DD HH:mm:ss');
    
export async function adicionarNovel(req) {

    const { titulo, descricao, autor, tipo, origem, status } = req.body;
    const slug = slugify(titulo);

    try {
        const resultado =  excuteQuery({
            query: 'INSERT INTO novel (titulo, slug, descricao, autor, tipo, origem, status, criadoEm, atualizadoEm) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
            values: [titulo, slug, descricao, autor, tipo, origem, status, agora, agora],
        });    
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function verNovel(slug) {

    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `titulo`, `slug`, `descricao`, `autor`, `tipo`, `origem`, `status`, `avaliacao`, `totalAvaliacao`, `visualizacao`, `criadoEm`, `atualizadoEm` FROM `novel` WHERE slug = ?',
            values: [slug],
        });
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function categorias(id) {
    try {
        const resultado = excuteQuery({
            query: 'SELECT `categoria_id` FROM `categoria_novel` WHERE `novel_id`=?',
            values: [id]
        });
        return resultado;
    } catch (erro) {
        return false;
    }
}

export async function tags(id) {
    try {
        const resultado = excuteQuery({
            query: 'SELECT `tag_id` FROM `tag_novel` WHERE `novel_id`=?',
            values: [id]
        });

        return resultado;
    } catch (erro) {
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