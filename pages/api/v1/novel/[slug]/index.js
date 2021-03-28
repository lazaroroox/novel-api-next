import { createUser, findUser, validatePassword } from '../../../../../lib/user';
import {adicionarNovel, verNovel, editarNovel} from '../../../../../lib/novel';
import {setLoginSession ,  getLoginSession} from '../../../../../lib/auth';
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

            const novel = await verNovel(slug);

            console.log(novel);


            res.status(200).json({
                status: 'sucesso',
                novel: novel
            });
        } else if (req.method === 'POST') {
            
            const novel = await adicionarNovel(req);

            console.log(novel.insertId);
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