const express = require('express');

require('./api/utils/db').connect();
const userRoutes = require('./api/routes/user');
const adminRoutes = require('./api/routes/admin');
const errorHandler = require('./api/middlewares/error');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', userRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`worker running on PORT: ${process.env.PORT}`);
});
