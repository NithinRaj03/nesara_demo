const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRouter = require("./routes/user");

const app = express();
dotenv.config();
app.use(cors())

mongoose.connect(process.env.DB_URI)
    .then(() => console.log("Database connected Successfully"))
    .catch((error) => console.log(error));


app.use(express.json())
app.use("/api/user", userRouter)

const port = process.env.PORT
app.listen(port, () => console.log(`Server running on ${port}`));