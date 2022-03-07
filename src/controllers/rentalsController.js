import connection from "../../db.js";
import dayjs from "dayjs";

export async function rentalsGet(req, res){
    try {
        const {rows : arrayRentals} = await connection.query(`
        SELECT rentals.*, 
        customers.id as "customer_Id", 
        customers.name as "customer_Name",
        games.id as "game_Id",
        games.name as "game_Name",
        categories.name as "game_CategoryName",
        categories.id as "game_CategoryId"
        FROM rentals
        JOIN customers
        ON rentals."customerId"=customers.id
        JOIN games
        ON rentals."gameId"=games.id
        JOIN categories
        ON games."categoryId"=categories.id
        `)

        res.send(arrayRentals.map((row) => {
            const rentalsFormatted = {
                ...row,
                rentDate: dayjs(row.rentDate).format('YYYY-MM-DD'),
                customer: {
                id: row.customer_Id,
                name: row.customer_Name
                },
                game: {
                id: row.game_Id,
                name: row.game_Name,
                categoryId: row.game_CategoryId,
                categoryName: row.game_CategoryName
                }
            }

            delete rentalsFormatted.customer_Id
            delete rentalsFormatted.customer_Name
            delete rentalsFormatted.game_CategoryId
            delete rentalsFormatted.game_CategoryName
            delete rentalsFormatted.game_Id
            delete rentalsFormatted.game_Name

            return rentalsFormatted
        } ))


    } catch (error) {
        res.status(500).send(error.message);
    }
}