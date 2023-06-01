const Goal = require("../models/goals");
const User = require("../models/users");

//@desc Get Goals
//@route GET /api/goals/
//@access Private
const getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    const user = await User.findById(req.user.id);
    res.status(200).json({ user: user.name, goals });
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

    const goal = await Goal.create({ text: req.body.text, user: req.user.id });
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
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(400);
      throw new Error("Goal ID is not valid");
    }

    //check if user is found
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    // check if goal is the active user's goal
    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized to update goal");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

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
      throw new Error("Goal ID is not valid");
    }

    //check if user is found
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    // check if goal is the active user's goal
    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized to delete goal");
    }

    res.status(200).json({
      message: `Delete goal Id: ${req.params.id}`,
      deletedGoal: await Goal.findById(req.params.id),
    });
    await goal.remove();
  } catch (error) {
    next(error);
  }
};

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
