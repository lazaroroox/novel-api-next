import { createUser, findUser, validatePassword } from '../../../../../lib/user';
import {adicionarNovel, verNovel, editarNovel} from '../../../../../lib/novel';
import {setLoginSession ,  getLoginSession} from '../../../../../lib/auth';
import { verAutorID } from '../../../../../lib/autor';
import { verTipoID } from '../../../../../lib/tipo';
import { verOrigemID } from '../../../../../lib/origem';
import { verStatusID } from '../../../../../lib/status';
export default async (req, res) => {
  
    const { slug } = req.query;
    const { asd } = req.body;
    console.log(asd);
    const user = await findUser({ email: 'lazarobransford@gmail.com' });
    console.log(user, await validatePassword(user, 'Icarus99'));
    if (user && (await validatePassword(user, 'Icarus99'))) {
        const session = {
            id: user.id,
            email: user.email,
        };

        await setLoginSession(res, session);
        
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
            const avaliacao = {
                quantidade: 4004
            };

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
                avaliacao: {
                    score: novel.avaliacao,
                    avaliacoes: avaliacao.quantidade
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

    }


}