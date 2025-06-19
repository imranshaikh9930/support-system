const express = require("express");
const path = require("path");
const cookieParser =  require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const replyRoutes = require("./routes/replyRoutes");
const agentRoutes = require("./routes/agentRoutes");
const adminRoutes = require("./routes/adminRoutes");


const connectDb = require("./utils/dbConnect");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/auth",authRoutes)
app.use("/ticket",ticketRoutes);
app.use("/reply",replyRoutes);
app.use("/",agentRoutes);
app.use("/admin",adminRoutes);
app.listen(5000,()=>{
    console.log(`Server running port 5000`);
    connectDb();
})