const { errorHandler } = require("../middlewares/errorMiddleware");
const Goal = require("../models/goals");

//@desc Get Goals
//@route GET /api/goals/
//@access Private
const getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find();
    res.status(200).json({ goals });
  } catch (error) {
    next(error);
  }
};

//@desc Set Goals
//@route POST /api/goals/
//@access Private
const setGoal = async (req, res, next) => {
  try {
    if (!req.body.text) {
      res.status(400);
      throw new Error("Please add a text field");
    }

    const goal = await Goal.create({ text: req.body.text });
    res.status(200).json(goal);
  } catch (error) {
    next(error);
  }
};

//@desc Update Goals
//@route PUT /api/goals/:id
//@access Private
const updateGoal = async (req, res, next) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedGoal) {
      res.status(400);
      throw new Error("ID is not valid");
    }

    res.status(200).json({
      message: `Updated goal ID : ${req.params.id}`,
      updatedText: updatedGoal.text,
    });
  } catch (error) {
    next(error);
  }
};

//@desc Delete Goals
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error("ID is not valid");
    }

    res.status(200).json({
      message: `Delete goal Id: ${req.params.id}`,
      deletedGoal: await Goal.findById(req.params.id),
    });
    await goal.remove()
  } catch (error) {
    next(error);
  }
};

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
