import connection from "../../db.js";


export async function businessRulesRental(req, res, next){
    const {customerId , gameId} = req.body
    
    try {
        const {rows : [validCustomerId]} = await connection.query(`
            SELECT *
            FROM customers
            WHERE id=$1
        
        `, [customerId])
        

        const {rows : [validGameId]} = await connection.query(`
        
            SELECT *
            FROM games
            WHERE id=$1
        
        `,[gameId])
        
        
        if(!validCustomerId){
            
            return res.sendStatus(400)
        }
        if(!validGameId){
            
            return res.sendStatus(400)
        }
    
        res.locals.price = {
            price : validGameId.pricePerDay
        }
    
    } catch (error) {
        res.status(500).send(error.message);
    }

    next()
}

export async function businessRulesRentalId(req, res, next){
    const {id} = req.params

    const method = req.method === 'POST' ? 'IS' : 'IS NOT'
    
    try {
        const {rows : [validRentalId]} = await connection.query(`
            SELECT *
            FROM rentals
            WHERE rentals.id=$1
            AND "returnDate" ${method} NULL
        `, [id])
        
        
        if(!validRentalId){
            return res.sendStatus(404)
        }
        res.locals.rentals = {
            ...validRentalId
        }
    
    
    } catch (error) {
        return res.status(500).send(error.message);
    }

    
    next()
}
