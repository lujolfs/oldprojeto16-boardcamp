import { connection } from "../database/db.js";

export async function create (req, res) {
    const { name } = req.body;

    try {
        await connection.query(
            "INSERT INTO categories (name) VALUES ($1);",
            [name]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function findAll (req, res) {
    try {
        const { rows } = await connection.query("SELECT * FROM categories;");
        res.send(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}