import connection from "../../db.js";

export async function customersGet(req, res){

    const {cpf} = req.query
    const {id} = req.params 

    if(!cpf && !id){
        try {
            const {rows : arrayCustomers} = await connection.query(`
            SELECT * 
            FROM customers
            `)
            res.send(arrayCustomers)
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}