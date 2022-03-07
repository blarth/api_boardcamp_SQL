import connection from "../../db.js";
import dayjs from "dayjs";

export async function rentalsGet(req, res) {
  const { customerId, gameId } = req.query;

  let query = "";

  if (customerId) {
    query = `WHERE customers.id=${sqlstring.escape(customerId)}`;
  }

  if (gameId) {
    query = `WHERE games.id=${sqlstring.escape(gameId)}`;
  }

  try {
    const { rows: arrayRentals } = await connection.query({
      text: `
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
        ${query}
        `,
      rowMode: "array",
    });

    res.send(
      arrayRentals.map((row) => {
        const rentalsFormatted = {
          ...row,
          rentDate: dayjs(row.rentDate).format("YYYY-MM-DD"),
          customer: {
            id: row.customer_Id,
            name: row.customer_Name,
          },
          game: {
            id: row.game_Id,
            name: row.game_Name,
            categoryId: row.game_CategoryId,
            categoryName: row.game_CategoryName,
          },
        };

        delete rentalsFormatted.customer_Id;
        delete rentalsFormatted.customer_Name;
        delete rentalsFormatted.game_CategoryId;
        delete rentalsFormatted.game_CategoryName;
        delete rentalsFormatted.game_Id;
        delete rentalsFormatted.game_Name;

        return rentalsFormatted;
      })
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function rentalsPost(req, res){
    const {customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee} = res.locals.rentals
    
    try {
        await connection.query(`
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}