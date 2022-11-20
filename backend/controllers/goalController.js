//@desc Get Goals
//@route GET /api/goals/
//@access Private
const getGoals = async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: "Get goals" });
};

//@desc Set Goals
//@route POST /api/goals/
//@access Private
const setGoals = async (req, res) => {
  res.status(200).json({ message: "Set goals" });
};

//@desc Update Goals
//@route PUT /api/goals/:id
//@access Private
const updateGoals = async (req, res) => {
  res.status(200).json({ message: `Updated goals of ${req.params.id}` });
};

//@desc Delete Goals
//@route DELETE /api/goals/:id
//@access Private
const deleteGoals = async (req, res) => {
  res.status(200).json({ message: `Delete goals of ${req.params.id}` });
};

module.exports = { getGoals, setGoals, updateGoals, deleteGoals };
