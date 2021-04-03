import excuteQuery from './db';
import moment from 'moment';


const agora = moment().format('YYYY-MM-DD HH:mm:ss');
    
export async function adicionarCategoria(req) {

    const { nome, slug, parente } = req.body;
    try {
        const resultado =  excuteQuery({
            query: 'INSERT INTO categoria (nome, slug, parente, criadoEm, atualizadoEm) VALUES(?, ?, ?, ?, ?)',
            values: [nome, slug, parente, agora, agora],
        });    
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function verCategoria(slug) {

    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug`, `parente` FROM `categoria` WHERE slug = ?',
            values: [slug],
        });
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function todasCategoria() {
    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug`, `parente` FROM `categoria`'
        });
        return resultado;

    } catch (error) {
        return false;
    }
}

export async function editarCategoria(req, id) {

    const { nome, slug, parente } = req.body;

    try {
        const resultado = excuteQuery({
            query: 'UPDATE novel SET `nome`=?, `slug`=?, `parente`=?, `atualizadoEm`=? WHERE id = ?',
            values: [nome, slug, parente, agora, id]
        });
        return resultado;
    } catch (error) {
        return false;
    }

}