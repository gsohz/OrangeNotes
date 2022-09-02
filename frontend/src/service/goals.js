import api from "./api";
import Auth from "./user";

export async function ListUserGoals(email) {
  const response = await api.get("/", { headers: Auth() });

  return response?.data ? response.data : {};
}

export async function OpenGoal(id) {
  const response = await api.get(`/${id}/goal`, { headers: Auth() });

  return response?.data ? response.data : {};
}

export async function CreateMainGoal(user, title, description, prediction) {
  const request = {
    user,
    title,
    description,
    prediction,
  };

  const response = await api.post("/goal", request, { headers: Auth() });

  console.log(response);

  return response ? response : [];
}
