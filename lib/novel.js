import excuteQuery from './db';
import moment from 'moment';
import slugify from 'slugify';
import { verCategoriaID } from './categoria';
import { verTagID } from './tag';
import { verAutorID } from './autor';
import { verTipoID } from './tipo';
import { verOrigemID } from './origem';
import { verStatusID } from './status';
import { totalAvaliacao } from './avaliacao';

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

export async function todosNovel() {

    try {
        const resultado = excuteQuery({
            query: 'SELECT novel.*, a.id as autor_id, a.nome as autor_nome, a.slug as autor_slug, t.id as tipo_id, t.nome as tipo_nome, t.slug as tipo_slug, o.id as origem_id, o.nome as origem_nome, o.slug as origem_slug, s.id as status_id, s.nome as status_nome, s.slug as status_slug FROM autor a INNER JOIN novel novel ON a.id = novel.autor INNER JOIN tipo t ON t.id = novel.tipo INNER JOIN origem o ON o.id = novel.origem INNER JOIN status s ON s.id = novel.status'

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
            query: 'SELECT tag.id as id, tag.nome as nome, tag.slug as slug FROM tag tag INNER JOIN tag_novel tagN ON tag.id = tagN.tag_id WHERE tagN.novel_id=?',
            values: [id]
        });
        //const resultado2 = excuteQuery({
       //     query: 'SELECT cat.id as id, cat.nome as nome, cat.slug as slug FROM categoria cat INNER JOIN categoria_novel catN ON cat.id = catN.categoria_id WHERE catN.novel_id=?',
       //     values: [id]
       // });
        //console.log(await resultado,await resultado2);
        return { categoria: await resultado };
    } catch (erro) {
        return false;
    }
}

export async function tags(id) {
    try {
        const resultado = excuteQuery({
            query: 'SELECT tag.id as id, tag.nome as nome, tag.slug as slug FROM tag tag INNER JOIN tag_novel tagN ON tag.id = tagN.tag_id WHERE tagN.novel_id=?',
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

export function novelItem(novel, categoria = [], tag = []) {

    //const _avaliacao = totalAvaliacao(novel.id);
   // const avaliacao = _avaliacao[0].total;
   // const tag = [];
    //const categoria = [];

   // const _categorias = await categorias(novel.id);
   // const _tags = await tags(novel.id);

    /*for (const final of _categorias) {

        const cat = await verCategoriaID(final.categoria_id);
        const cat1 = cat[0];                    
        
        categoria.push(cat1);
    }

    for (const final of _tags) {
        const ta = await verTagID(final.tag_id);
        const ta1 = ta[0];
        tag.push(ta1);
    }
*/
    const resultado = {
        id: novel.id,
        livroId: novel.id,
        titulo: novel.titulo,
        slug: novel.slug,
        thumbnail: novel.thumbnail,
        descricao: novel.descricao,
        autor: {
            id: novel.autor_id,
            nome: novel.autor_nome,
            slug: novel.autor_slug
        },
        tipo: {
            id: novel.tipo_id,
            nome: novel.tipo_nome,
            slug: novel.tipo_slug,
        },
        origem: {
            id: novel.origem_id,
            nome: novel.origem_nome,
            slug: novel.origem_slug
        },
        status: {
            id: novel.status_id,
            nome: novel.status_nome,
            slug: novel.status_slug
        },
        categorias: categoria,
        tags: tag,
        avaliacao: {
            score: novel.avaliacao,
            total: novel.totalAvaliacao
        },
        visualizacao: novel.visualizacao,
        criado: novel.criadoEm,
        atualizado: novel.atualizadoEm
    }
    return resultado;
}