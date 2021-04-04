import { createUser, findUser, validatePassword } from '../../../../../lib/user';
import {adicionarNovel, verNovel, editarNovel, categorias, tags} from '../../../../../lib/novel';
import { setLoginSession, getLoginSession } from '../../../../../lib/auth';
import { verCategoriaID } from '../../../../../lib/categoria';
import { verTagID } from '../../../../../lib/tag';
import { verAutorID } from '../../../../../lib/autor';
import { verTipoID } from '../../../../../lib/tipo';
import { verOrigemID } from '../../../../../lib/origem';
import { verStatusID } from '../../../../../lib/status';
import { totalAvaliacao } from '../../../../../lib/avaliacao';
export default async (req, res) => {
  
    const { slug } = req.query;
  //  console.log(asd);
 //   const user = await findUser({ email: 'lazarobransford@gmail.com' });
   // console.log(user, await validatePassword(user, 'Icarus99'));
    //if (user && (await validatePassword(user, 'Icarus99'))) {
      //  const session = {
       //     id: user.id,
        //    email: user.email,
       // };

        //await setLoginSession(res, session);
        
        if (req.method === 'GET') {

            const _novel = await verNovel(slug);
            const novel = _novel[0];

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


            res.status(200).json({
                status: 'sucesso',
                novel: resultado
            });
        } else if (req.method === 'POST') {
            
            const novel = await adicionarNovel(req);
            if (novel) {
                res.status(200).json({
                    status: 'sucesso',
                    id: novel.insertId
                })
            } else {
                res.status(203).json({
                    status: 'erro',
                    msg: 'Não foi possivel salvar.'
                })
            }
        } else if (req.method === 'PUT') {
            const novel = await editarNovel(req, slug);

            console.log(novel);
        }

    //}


}