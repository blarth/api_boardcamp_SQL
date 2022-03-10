import connection from "../../db.js";

export async function gamesGet(req, res) {
  const filterName = req.query.name;
  if (filterName) {
    try {
      const { rows: arrayGames } = await connection.query(
        `
            SELECT games.*,
            categories.name as "categoryName"
            FROM games
            JOIN categories
            ON categories.id =
            games."categoryId"
            WHERE LOWER (name) LIKE LOWER ($1)
            `,
        [`${filterName}%`]
      );
      return res.send(arrayGames);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  try {
    const { rows: arrayGames } = await connection.query(`
        SELECT games.*,
        categories.name as "categoryName"
        FROM games
        JOIN categories
        ON categories.id =
        games."categoryId"
        `);
    res.send(arrayGames);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function gamesPost(req, res) {
  const game = res.locals.games;
  
  try {
      await connection.query(`

        INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
        VALUES ($1, $2, $3, $4, $5)
      
      
      `,[game.name, game.image, game.stockTotal, game.categoryId, game.pricePerDay])
    res.sendStatus(201)

  } catch (error) {
    res.status(500).send(error.message);

  }
}
