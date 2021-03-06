import connection from "../../db.js"

export async function businessRulesGames(req, res, next){
    const game = res.locals.games;


    try {
        const {rows : [validIdCategory]} = await connection.query(`
            SELECT *
            FROM categories
            WHERE categories.id=$1
        
        `, [game.categoryId])

        const {rows : [invalidName]} = await connection.query(`
            SELECT *
            FROM games
            WHERE games.name=$1
        
        `,[game.name])
        
        
        if(!validIdCategory){
            return res.sendStatus(400)
        }
        if(invalidName){
            return res.sendStatus(409)
        }
    
    } catch (error) {
        return res.status(500).send(error.message);
    }

    next()
}

