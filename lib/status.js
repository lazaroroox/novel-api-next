import excuteQuery from './db';
import moment from 'moment';


const agora = moment().format('YYYY-MM-DD HH:mm:ss');
    
export async function adicionaStatus(req) {

    const { nome, slug } = req.body;
    console.log(nome, slug);
    try {
        const resultado =  excuteQuery({
            query: 'INSERT INTO status (nome, slug) VALUES(?, ?)',
            values: [nome, slug],
        });
        console.log(resultado);
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function verStatus(slug) {

    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug` FROM `status` WHERE slug = ?',
            values: [slug],
        });
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function verStatusID(id) {

    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug` FROM `status` WHERE id = ?',
            values: [id],
        });
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function todosStatus() {
    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug` FROM `status`'
        });
        return resultado;

    } catch (error) {
        return false;
    }
}

export async function editarStatus(req, id) {

    const { nome, slug } = req.body;

    try {
        const resultado = excuteQuery({
            query: 'UPDATE status SET `nome`=?, `slug`=? WHERE id = ?',
            values: [nome, slug, id]
        });
        return resultado;
    } catch (error) {
        return false;
    }

}