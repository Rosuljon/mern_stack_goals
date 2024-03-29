import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
const port = process.env.PORT || 5000;
import routerGoal from './routes/goalRoutes.js';
import routerUser from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use('/api/goals', routerGoal)
app.use('/api/users', routerUser);
app.use(errorHandler);

app.listen(port, () => {
    console.log('listening on port ' + port);
})