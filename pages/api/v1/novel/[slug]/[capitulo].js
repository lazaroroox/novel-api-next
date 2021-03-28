import {createUser, findUser, validatePassword} from '../../../../../lib/user';
import { setLoginSession, getLoginSession } from '../../../../../lib/auth';

export default async (req, res) => {
    
    const session = await getLoginSession(req);

    const { slug, capitulo } = req.query;

    console.log(req)

    if (req.method === 'GET') {

        res.status(200).json({
            status: 'sucesso',
            slug: slug,
            capitulo: capitulo
        });

    }
    
    


}