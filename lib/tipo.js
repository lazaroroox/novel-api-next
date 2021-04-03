import excuteQuery from './db';
import moment from 'moment';


const agora = moment().format('YYYY-MM-DD HH:mm:ss');
    
export async function adicionaTipo(req) {

    const { nome, slug } = req.body;
    console.log(nome, slug);
    try {
        const resultado =  excuteQuery({
            query: 'INSERT INTO tipo (nome, slug) VALUES(?, ?)',
            values: [nome, slug],
        });
        console.log(resultado);
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function verTipo(slug) {

    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug` FROM `tipo` WHERE slug = ?',
            values: [slug],
        });
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function verTipoID(id) {

    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug` FROM `tipo` WHERE id = ? LIMIT 1',
            values: [id],
        });
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function todosTipo() {
    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug` FROM `tipo`'
        });
        return resultado;

    } catch (error) {
        return false;
    }
}

export async function editarTipo(req, id) {

    const { nome, slug } = req.body;

    try {
        const resultado = excuteQuery({
            query: 'UPDATE tipo SET `nome`=?, `slug`=? WHERE id = ?',
            values: [nome, slug, id]
        });
        return resultado;
    } catch (error) {
        return false;
    }

}