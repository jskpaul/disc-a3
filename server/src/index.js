import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import { error } from "console";
import { v4 as uuidv4 } from 'uuid';
import { hash } from "crypto";
import bcrypt from 'bcryptjs';
import supabase from "./config/supabase.js";

async function hashPassword(password) {
    const saltRounds = 10; // Number of salt rounds (higher is more secure, but slower)
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
}
const { Pool } = pg;
dotenv.config();
const app = express();

const port = process.env.PORT || 3002;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your front-end's URL
    credentials: true, // Allow credentials to be included
}));

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

        const { data, error } = await supabase
            .from('users')
            .select(`
    firstname,
    lastname,
    user_profiles (
      major,
      graduation_year
    )
  `);

        // const result = await pool.query(
        //     "select * from users order by id asc"
        // )
        res.json(data);
    } catch (error) {
        console.error("Query error:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

app.post("/api/auth/user", async (req, res) => {
    const { email, pwd, firstname, lastname } = req.body;
    try {
        // const pwdhash = await hashPassword(password);
        // console.log(pwd)

        const { user_data, user_error } = await supabase
            .from('users')
            .insert([
                { email: email, firstname: firstname, lastname: lastname },
            ])
            .select()

        const { data, error } = await supabase.auth.signUp({
            email,
            password: pwd,
        });
        if (error) throw error;
        res.json({ message: "Registration successful!", user: data.user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    // try {
    //     const newUser = req.body
    //     console.log(newUser);
    //     const check_sql_result = await pool.query(
    //         "select email from users where email = $1;", [newUser['email']]
    //     )
    //     if (check_sql_result['rowCount']) {
    //         throw new Error("A user already exists with this email. Try a different email.")
    //     }
    //     const userid = uuidv4();
    //     const firstname = newUser['firstname']
    //     // console.log(firstname)
    //     const lastname = newUser['lastname']
    //     const email = newUser['email']
    //     const gradyear = newUser['graduationyear'];
    //     const major = newUser['major'];
    //     const dateofbirth = newUser['birthdate'];
    //     const profilepictureurl = newUser['photoUrl'];
    //     const pwdhash = await hashPassword(newUser['pwd']);
    //     console.log(pwdhash)
    //     // console.log(newUser)
    //     const result = await pool.query(
    //         `insert into users (id, firstname, lastname, email, major, graduationyear, dateofbirth, profilepictureurl, pwdhash) 
    //         values($1, $2, $3, $4, $5, $6, $7, $8, $9); `, [userid, firstname, lastname, email, major, gradyear, dateofbirth, profilepictureurl, pwdhash]
    //     )
    //     // console.log(result);

    //     res.status(200).json({ msg: "successfully added user", user: newUser })
    // } catch (err) {
    //     console.error("Query error:", err);
    //     res.status(500).json({ error: "Failed to add user", msg: err });
    // }
})

app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        res.json({ token: data.session.access_token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

const checkSession = async (req, res) => {
    try {
        const {data, error} = await supabase.auth.getSession();
        res.json({'session_token': data.session.access_token})
    } catch (error) {
        res.status(401).json({ error: error });

    }
}
const checkAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser(token);
        if (error) throw error;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
app.get('/api/auth/status', checkSession);

app.post('/api/auth/logout', async (req, res) => {
    const { error } = await supabase.auth.signOut();
    
})

app.get("/api/protected", checkAuth, (req, res) => {
    res.json({
        message: "You are authenticated!",
        user: req.user.email,
        timestamp: new Date().toISOString(),
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;