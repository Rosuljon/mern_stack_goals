import asyncHandler from 'express-async-handler';

const getGoals = asyncHandler( async (req, res) =>{
    res.status(200).json({message: 'Goals'});
})
const postGoals = asyncHandler( async (req, res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('please enter a title')
    }
    res.status(200).json({message: 'Set Goals'})
});
const putGoals = asyncHandler(async (req, res) =>{
    res.status(200).json({message: `update goals ${req.params.id}`});
});
const deleteGoals = asyncHandler(async (req, res) =>{
    res.status(200).json({message: `delete goals ${req.params.id}`});
});

export {getGoals, postGoals, putGoals, deleteGoals};