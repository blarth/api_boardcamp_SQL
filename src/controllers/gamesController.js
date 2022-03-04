import connection from "../../db.js";

export async function gamesGet(req, res){
    const filterName = req.query.name;
    if(filterName){
        try {
            const {rows: arrayGames} = await connection.query(`
            SELECT *.games,
            categories.name
            FROM games
            WHERE name=$1
            JOIN categories
            ON categories.id =
            games."categoryId"

            `,[filterName]) 
            res.send(arrayGames)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
    try {
        const {rows: arrayGames} = await connection.query(`
        SELECT *.games,
        categories.name
        FROM games
        JOIN categories
        ON categories.id =
        games."categoryId"
        `)
        res.send(arrayGames)
    } catch (error) {
        res.status(500).send(error.message)
    }
}