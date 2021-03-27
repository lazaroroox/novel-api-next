export default async (req, res) => {
  
    const { slug } = req.query;
    
    if (req.method === 'GET') {

        res.status(200).json({
            status: 'sucesso',
            slug: slug
        });
    }


}