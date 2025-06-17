// app.js
const express = require("express");
const app = express();
const session = require('express-session'); 
var passport = require('passport');
const PORT = process.env.PORT || 3000;
const { PrismaClient } = require('./generated/prisma');
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = new PrismaClient()
const path = require('path');

const indexRouter = require("./routes/indexRouter");
const uploadRouter = require("./routes/uploadRouter");
const folderRouter = require("./routes/folderRouter");

require('./config/passport');
require('dotenv').config();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new PrismaSessionStore(
        prisma,
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    ),
    saveUninitialized: false,
    secret: process.env.SECRET,
    resave: false,
    cookie: {maxAge: 30 * 24 * 60 * 60 * 1000 },
}));

app.use(passport.session());
app.use("/", indexRouter);
app.use("/upload", uploadRouter);
app.use("/folder", folderRouter);

app.listen(PORT, () => {
    console.log("Listening on 3000");
})