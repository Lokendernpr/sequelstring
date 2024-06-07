const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ extended: false}));

// Routes
app.use("/api/auth" , require('./routes/auth'));
app.use("/api/document" , require('./routes/document'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT} `));