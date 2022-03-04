import connection from "../../db.js";

export async function categoriesGet(req, res){
    try {
        const { rows: arrayCategories } = await connection.query(`
            SELECT  *
              FROM  categories
        `)
        res.send(arrayCategories)
}catch (error) {
    if (error) return res.status(error.status).send([]);

    res.status(500).send(error.message)
}

}