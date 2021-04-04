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
            query: 'SELECT `id`, `titulo`, `slug`, `descricao`, `autor`, `tipo`, `origem`, `status`, `avaliacao`, `totalAvaliacao`, `visualizacao`, `criadoEm`, `atualizadoEm` FROM `novel`'
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

export async function novelItem(novel) {

    const _autor = await verAutorID(novel.autor);
    const autor = _autor[0];
    const _tipo = await verTipoID(novel.tipo);
    const tipo = _tipo[0]
    const _origem = await verOrigemID(novel.origem);
    const origem = _origem[0];
    const _status = await verStatusID(novel.status);
    const status = _status[0];
    const _avaliacao = await totalAvaliacao(novel.id);
    const avaliacao = _avaliacao[0].total;
    const tag = [];
    const categoria = [];

    const _categorias = await categorias(novel.id);
    const _tags = await tags(novel.id);

    for (const final of _categorias) {

        const cat = await verCategoriaID(final.categoria_id);
        const cat1 = cat[0];                    
        
        categoria.push(cat1);
    }

    for (const final of _tags) {
        const ta = await verTagID(final.tag_id);
        const ta1 = ta[0];
        tag.push(ta1);
    }

    const resultado = {
        id: novel.id,
        livroId: novel.id,
        titulo: novel.titulo,
        slug: novel.slug,
        thumbnail: novel.thumbnail,
        descricao: novel.descricao,
        autor: {
            id: autor.id,
            nome: autor.nome,
            slug: autor.slug
        },
        tipo: {
            id: tipo.id,
            nome: tipo.nome,
            slug: tipo.slug,
        },
        origem: {
            id: origem.id,
            nome: origem.nome,
            slug: origem.slug
        },
        status: {
            id: status.id,
            nome: status.nome,
            slug: status.slug
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