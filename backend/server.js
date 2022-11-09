import express from 'express';
import dotenv from 'dotenv/config';
const port = process.env.PORT || 5000;
import router from './routes/goalRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/goals', router)
app.use(errorHandler);

app.listen(port, () => {
    console.log('listening on port ' + port);
})