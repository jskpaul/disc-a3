import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;
dotenv.config();
const app = express();

const port = process.env.PORT || 3002;
app.use(express.json());
app.use(cors());

export const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    },

});
pool.connect().then(() => console.log("Connected to the database successfully"))
    .catch((err) => console.error("Database connection error:", err.stack));

app.get("/api/users", async (req, res) => {
    try {
        const result = await pool.query(
            "select * from users order by id asc"
        )
        res.json(result.rows);
    } catch (error) {
        console.error("Query error:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;