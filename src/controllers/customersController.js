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
    if(!cpf){
        try {
            const {rows : customerId} = await connection.query(`
            SELECT * 
            FROM customers
            WHERE customers.id=$1
            `,[id])
            res.send(customerId)
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    try {
        const {rows : customerCpf} = await connection.query(`
        SELECT * 
        FROM customers
        WHERE customers.cpf LIKE $1
        `,[`${cpf}%`])
        res.send(customerCpf)
    } catch (error) {
        res.status(500).send(error.message);
    }


}