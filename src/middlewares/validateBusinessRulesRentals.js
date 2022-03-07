import connection from "../../db.js";

export async function businessRulesRental(req, res, next){
    const {customerId , gameId} = req.body
    
    try {
        const {rows : [validCustomerId]} = await connection.query(`
            SELECT *
            FROM customers
            WHERE customers.id=$1
        
        `, [customerId])

        const {rows : [validGameId]} = await connection.query(`
            SELECT *
            FROM games
            WHERE games.name=$1
        
        `,[gameId])
        
        
        if(!validCustomerId){
            res.sendStatus(400)
        }
        if(!validGameId){
            res.sendStatus(400)
        }
    
        res.locals.gamePrice = {
            price : validGameId.pricePerDay
        }
    
    } catch (error) {
        res.status(500).send(error.message);
    }

    next()
}