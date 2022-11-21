const Goal = require("../models/goals");

//TODO: Error Handling with thrown error not working properly
//@desc Get Goals
//@route GET /api/goals/
//@access Private
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json({ goals });
  } catch (error) {
    res.send(error.message);
  }
};

//@desc Set Goals
//@route POST /api/goals/
//@access Private
const setGoals = async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  try {
    goal = await Goal.create({ text: req.body.text });
    res.status(200).json(goal);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

//@desc Update Goals
//@route PUT /api/goals/:id
//@access Private
const updateGoals = async (req, res) => {
  try {
    Goal.findByIdAndUpdate(req.params.id, req.body.text, { new: true });
    res.status(200).json({
      message: `Updated goal ID : ${req.params.id}`,
      updateText: await Goal.findById(req.params.id).text,
    });
  } catch (error) {
    res.send(error);
  }
};

//@desc Delete Goals
//@route DELETE /api/goals/:id
//@access Private
const deleteGoals = async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({
        message: `Delete goal Id: ${req.params.id}`,
        deletedText: await Goal.findById(req.params.id).text,
      });
  } catch (error) {
    res.send(error);
  }
};

module.exports = { getGoals, setGoals, updateGoals, deleteGoals };
