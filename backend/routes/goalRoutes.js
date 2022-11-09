import express from 'express';
import {getGoals, postGoals, putGoals, deleteGoals} from '../controller/goalController.js';
const router = express.Router();

router.route('/').get(getGoals).post(postGoals);
router.route('/:id').put(putGoals).delete(deleteGoals);


export default router;