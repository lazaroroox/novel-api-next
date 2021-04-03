import excuteQuery from './db';
import moment from 'moment';


const agora = moment().format('YYYY-MM-DD HH:mm:ss');
    
export async function adicionaAutor(req) {

    const { nome, slug } = req.body;
    try {
        const resultado =  excuteQuery({
            query: 'INSERT INTO autor (nome, slug, criadoEm, atualizadoEm) VALUES(?, ?, ?, ?)',
            values: [nome, slug, agora, agora],
        });    
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function verAutor(slug) {

    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug` FROM `autor` WHERE slug = ?',
            values: [slug],
        });
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function verAutorID(id) {

    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug` FROM `autor` WHERE id = ? LIMIT 1',
            values: [id],
        });
        return resultado;
    } catch (erro) {
        return false;
    }
}

export async function todosAutor() {
    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug` FROM `autor`'
        });
        return resultado;

    } catch (error) {
        return false;
    }
}

export async function editarAutor(req, id) {

    const { nome, slug } = req.body;

    try {
        const resultado = excuteQuery({
            query: 'UPDATE autor SET `nome`=?, `slug`=? `atualizadoEm`=? WHERE id = ?',
            values: [nome, slug, agora, id]
        });
        return resultado;
    } catch (error) {
        return false;
    }

}