import excuteQuery from './db';
import moment from 'moment';


const agora = moment().format('YYYY-MM-DD HH:mm:ss');
    
export async function adicionaTag(req) {

    const { nome, slug } = req.body;
    console.log(nome, slug);
    try {
        const resultado =  excuteQuery({
            query: 'INSERT INTO tag (nome, slug) VALUES(?, ?)',
            values: [nome, slug],
        });
        console.log(resultado);
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function verTag(slug) {

    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug` FROM `tag` WHERE slug = ?',
            values: [slug],
        });
        return resultado;
    } catch (error) {
        return false;
    }
}

export async function todasTag() {
    try {
        const resultado = excuteQuery({
            query: 'SELECT `id`, `nome`, `slug` FROM `tag`'
        });
        return resultado;

    } catch (error) {
        return false;
    }
}

export async function editarTag(req, id) {

    const { nome, slug } = req.body;

    try {
        const resultado = excuteQuery({
            query: 'UPDATE tag SET `nome`=?, `slug`=? WHERE id = ?',
            values: [nome, slug, id]
        });
        return resultado;
    } catch (error) {
        return false;
    }

}