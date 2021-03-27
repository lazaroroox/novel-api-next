export default async (req, res) => {
  
    const { id } = req.query;
    
    if (req.method === 'GET') {

        res.status(200).json({
            status: 'sucesso',
            id: id
        });
    }


}