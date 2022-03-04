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

export async function categoriesPost(req, res){

    const {name} = req.body

    try {
        const alreadyInCategorie = await connection.query(`
            SELECT  *
              FROM  categories
             WHERE  name = $1
        `, [ name ]);

        if(alreadyInCategorie.rows.length) return res.sendStatus(409)

        await connection.query(`
            INSERT INTO  categories ( name )
                 VALUES  ( $1 )
        `, [ name ]);
        
}catch (error) {
    if (error) return res.status(error.status).send([]);

    res.status(500).send(error.message)
}

}