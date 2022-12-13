import { connection } from "../database/db.js";

export async function create (req, res) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        await connection.query(
            `INSERT INTO rentals 
                (customerId, gameId, daysRented) 
            VALUES 
                ($1, $2, $3);`,
            [customerId, gameId, daysRented]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function findAll (req, res) {
    try {
        const { rows } = await connection.query("SELECT * FROM customers;");
        res.send(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function findById (req, res) {
    const { id } = req.params;

    try {
        const { rows } = await connection.query(
            `SELECT * FROM customers WHERE id=$1;`,
            [id]
        );
        res.send(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function update (req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;

    try {
        await connection.query(
            `UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;`,
            [name, phone, cpf, birthday, id]
        );
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}