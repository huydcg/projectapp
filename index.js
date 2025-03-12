require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Bắt buộc với PostgreSQL trên Render
});

app.use(cors());
app.use(express.json());

// Thêm sản phẩm
app.post("/products", async (req, res) => {
    try {
        const { name, price } = req.body;
        const newProduct = await pool.query(
            "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
            [name, price]
        );
        res.json(newProduct.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Tìm kiếm sản phẩm
app.get("/products", async (req, res) => {
    try {
        const { name } = req.query;
        const products = await pool.query(
            "SELECT * FROM products WHERE name ILIKE $1",
            [`%${name}%`]
        );
        res.json(products.rows);
    } catch (err) {
        console.error(err.message);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
