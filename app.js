if (process.env.NODE_ENV !== 'prod') require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', (req, res) => {
    res.send('server running');
});

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`server running on ${process.env.HOST}:${process.env.PORT}`);
});