import { connection } from "../database/db.js";
import dayjs from "dayjs"

export async function create (req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const rentDate = dayjs().format('YYYY-MM-DD')
    let pricePerDay

    try {
        const { rows } = await connection.query(
            `SELECT * FROM games WHERE id=$1;`,
            [gameId]
        );
        pricePerDay = rows[0].pricePerDay
    }

    catch (err) {
        res.status(500).send(err.message);
    }
    
    try {
        const originalPrice = pricePerDay * daysRented;
        await connection.query(
            `INSERT INTO rentals 
                ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7);`,
            [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function findAll (req, res) {
    try {
        const rentalsForm = await connection.query(`
        SELECT 
            rentals.id,
            rentals."customerId",
            rentals."rentDate"::text,
            rentals."daysRented",
            rentals."returnDate"::text,
            rentals."originalPrice",
            rentals."delayFee",
            JSON_BUILD_OBJECT(
                'id', customers.id,
                'name', customers.name
            ) AS customer,
            JSON_BUILD_OBJECT(
                'id', games.id,
                'name', games.name,
                'categoryId', games."categoryId",
                'categoryName', categories.name
            ) AS game
        FROM 
            customers
        JOIN
            rentals
        ON
            customers.id = rentals."customerId"
        JOIN
            games
        ON
            rentals."gameId" = games.id
        JOIN
            categories
        ON
            games."categoryId"=categories.id  `);
        res.send(rentalsForm.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function finish (req, res) {
    const { id } = req.params;
    const returnDate = dayjs().format('YYYY-MM-DD')

    try {
        await connection.query(
            `UPDATE rentals SET "returnDate"=$1 WHERE id=$2;`,
            [returnDate, id]
        );
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteRent (req, res) {
    const {id} = req.params;

    try {
        await connection.query(
            `DELETE FROM rentals WHERE id=$1`, [id]
        );
        res.sendStatus(200);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}