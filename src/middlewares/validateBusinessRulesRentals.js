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

export async function businessRulesRentalReturn(req, res, next){
    const {id} = req.params
    
    try {
        const {rows : [validRentalId]} = await connection.query(`
            SELECT *
            FROM rentals
            WHERE rentals.id=$1
            AND "returnDate" IS NULL
        `, [id])
        console.log(validRentalId)
        
        if(!validRentalId){
            res.sendStatus(404)
        }
        res.locals.rentals = {
            ...validRentalId
        }
    
    
    } catch (error) {
        res.status(500).send(error.message);
    }

    
    next()
}
