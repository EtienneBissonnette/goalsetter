import axios from "axios";

const API_URL = "api/goals/";

//get active user goals
const getGoals = async (userData) => {
  const response = await axios.get(API_URL, userData);

  if (response.data) {
    localStorage.setItem("goals", JSON.stringify(response.data));
  }

  return response.data;
};

//create new goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);
  return response.data;
};

const goalService = { getGoals, createGoal };

export default goalService;
