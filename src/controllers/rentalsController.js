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

        const [id, customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee, customer_Id, customer_Name, game_Id, game_Name, game_CategoryName,  game_CategoryId] = row

        const rentalsFormatted = {
          id ,
          customerId,
          gameId,
          rentDate: dayjs(row.rentDate).format("YYYY-MM-DD"),
          daysRented,
          returnDate,
          originalPrice,
          delayFee,
          customer: {
            id: customer_Id,
            name: customer_Name,
          },
          game: {
            id: game_Id,
            name: game_Name,
            categoryName: game_CategoryName,
            categoryId: game_CategoryId,
          },
        };


        return rentalsFormatted;
      })
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function rentalsPost(req, res){
    const {customerId, gameId, rentDate, daysRented, originalPrice, returnDate, delayFee} = res.locals.rentals
    
    
    
    try {
        await connection.query(`
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);

        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}


export async function rentalsPostReturn(req, res){

  const rentalReturn = res.locals.rentals

  try {
    await connection.query(`
    UPDATE rentals
    SET "delayFee"=$1, "returnDate"=$2
    WHERE id=$3
    `,[rentalReturn.delayFee, rentalReturn.returnDate, rentalReturn.id])
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function rentalsDelete(req, res){
  
  const {id} = req.params

  try {
    await connection.query(`
    DELETE 
    FROM rentals
    WHERE id=$1
    `,[id])
    res.sendStatus(200)
    
  } catch (error) {
    res.status(500).send(error.message);
  }
}