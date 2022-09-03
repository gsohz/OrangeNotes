import api from "./api";
import Auth from "./user";

export async function ListUserGoals() {
  const response = await api.get("/", { headers: Auth() });

  return response?.data ? response.data : {};
}

export async function OpenGoal(id) {
  const response = await api.get(`/${id}/goal`, { headers: Auth() });

  return response?.data ? response.data : {};
}

export async function CreateGoal(id, title, description, prediction) {
  const request = {
    title,
    description,
    prediction,
  };

  let response;
  if (id === undefined) {
    response = await api.post("/goal", request, { headers: Auth() });
  } else {
    response = await api.post(`${id}/goal`, request, { headers: Auth() });
  }

  return response ? response : [];
}

export async function DeleteGoal(id) {
  const response = await api.delete(`/${id}/goal`, { headers: Auth() });

  return response ? response : {};
}

export async function UpdateGoal(id, title, description, prediction) {
  const request = {
    title,
    description,
    prediction,
  };
  const response = await api.put(`/${id}/goal`, request, { headers: Auth() });

  return response ? response : {};
}
