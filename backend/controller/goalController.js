import asyncHandler from 'express-async-handler';
import Goal from '../modals/goalModal.js'


const getGoals = asyncHandler( async (req, res) =>{
    const goals = await Goal.find();
    res.status(200).json(goals);
})


const postGoals = asyncHandler( async (req, res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please enter a title')
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
});


const putGoals = asyncHandler(async (req, res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400);
        throw new Error('goal not found');
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new : true})
    res.status(200).json(updatedGoal);
});


const deleteGoals = asyncHandler(async (req, res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('goal not found')
    }
    await goal.remove()
    res.status(200).json({id : req.params.id});
});

export {getGoals, postGoals, putGoals, deleteGoals};