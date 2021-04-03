import excuteQuery from './db';
import moment from 'moment';


const agora = moment().format('YYYY-MM-DD HH:mm:ss');
    
export async function adicionaOrigem(req) {

    const { nome, slug } = req.body;
    console.log(nome, slug);
    try {
        const resultado =  excuteQuery({
            query: 'INSERT INTO origem (nome, slug) VALUES(?, ?)',
            values: [nome, slug],
        });
        console.log(resultado);
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function verOrigem(slug) {

    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug` FROM `origem` WHERE slug = ?',
            values: [slug],
        });
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function verOrigemID(id) {

    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug` FROM `origem` WHERE id = ?',
            values: [id],
        });
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function todasOrigem() {
    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug` FROM `origem`'
        });
        return resultado;

    } catch (error) {
        return false;
    }
}

export async function editarOrigem(req, id) {

    const { nome, slug } = req.body;

    try {
        const resultado = excuteQuery({
            query: 'UPDATE origem SET `nome`=?, `slug`=? WHERE id = ?',
            values: [nome, slug, id]
        });
        return resultado;
    } catch (error) {
        return false;
    }

}