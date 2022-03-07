import connection from "../../db.js";

export async function validateBusinessRulesCustomer(req, res, next){
    console.log("helous, its me the businessman")

    try {
        const {rows : [invalidCpf]} = await connection.query(`
        SELECT *
        FROM customers
        WHERE customers.cpf=$1
        `, [res.locals.customers.cpf])

        if(invalidCpf){
            res.sendStatus(409)
        }
    } catch (error) {
        res.status(500).send(error.message);
    }

    next()
}