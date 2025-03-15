


import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3010;
const SECRET_KEY = "this_is_secret_key";

app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());
app.use(cookieParser());

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const db = client.db("Finance");
const users = db.collection("users");
const expensesCollection = db.collection("expenses");

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

app.get("/checkAuth", (req, res) => {
    const token = req.cookies.token; 
    console.log("The Token is"+token);
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    jwt.verify(token, "this_is_secret_key", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      res.status(200).json({ message: "Authenticated", user: decoded });
    });
  });
  

app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, email, and password are required" });
    }

    try {
        await client.connect();
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        const userId = `USER_${Date.now()}`;
        const newUser = { userId, username, email, password };

        await users.insertOne(newUser);

        const token = jwt.sign({ userId, username, email }, SECRET_KEY, { expiresIn: "1h" });

        res.cookie("token", token, { 
            httpOnly: true,  
            secure: false,  
            sameSite: "Lax",  
            maxAge: 3600000  
        });
        
        res.status(201).json({ message: "User registered successfully", email });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await client.close();
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        await client.connect();
        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.userId, username: user.username, email }, SECRET_KEY, { expiresIn: "1h" });

        res.cookie("token", token, { 
            httpOnly: true,  
            secure: false,  // Change to `true` in production (HTTPS)
            sameSite: "Lax",  // Allows cookies to be sent with same-site requests
            maxAge: 3600000  
        });
        

        res.status(200).json({ message: "Login successful", email });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    } finally {
        await client.close();
    }
});



app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
});

// Add Expense
app.post("/addExpense", verifyToken, async (req, res) => {
    console.log("Enter Add Expense");
    
    const { date, type, category, description, amount, paymentMethod, status } = req.body; // Add type
    let dbClient;
    try {
        await client.connect();

        const result = await expensesCollection.insertOne({
            userId: req.user.userId, 
            date,
            type,  // Ensure type is included
            category,
            description,
            amount,
            paymentMethod,
            status
        });
        await client.close();

        res.status(201).json({ message: "Expense added successfully", id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: "Error adding expense" });
        console.log(err);
        
    } finally {
        await client.close();
    }
});


// Update Expense
app.post("/updateExpense", verifyToken, async (req, res) => {
    const { id, date, category, description, amount, paymentMethod, status } = req.body;
    let dbClient;
    try {
        dbClient = new MongoClient(uri);
        await dbClient.connect();
        const db = dbClient.db("Finance");
        const expenses = db.collection("expenses");

        const updateResult = await expenses.updateOne(
            { _id: new ObjectId(id), userId: req.user.userId },
            { $set: { date, category, description, amount, paymentMethod, status } }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ error: "Expense not found or not authorized" });
        }

        res.status(200).json({ message: "Expense updated successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error updating expense" });
    } finally {
        if (dbClient) await dbClient.close();
    }
});

// Delete Expense
app.post("/deleteExpense", verifyToken, async (req, res) => {
    const { id } = req.body;
    let dbClient;
    try {
        dbClient = new MongoClient(uri);
        await dbClient.connect();
        const db = dbClient.db("Finance");
        const expenses = db.collection("expenses");

        const deleteResult = await expenses.deleteOne({ _id: new ObjectId(id), userId: req.user.userId });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ error: "Expense not found or not authorized" });
        }

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting expense" });
    } finally {
        if (dbClient) await dbClient.close();
    }
});






app.get("/getExpenses", verifyToken, async (req, res) => {
    try {
       await client.connect();

        console.log("User ID from token:", req.user.userId); 

        const expensesList = await expensesCollection.find({ userId: req.user.userId }).toArray();
        console.log(expensesList);
        
        res.json(expensesList);
    } catch (err) {
        console.error("Error fetching expenses:", err); // Log full error details
        res.status(500).json({ error: "Error fetching expenses" });
    }
});


    



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
