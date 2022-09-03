import api from "./api";
import Auth from "./user";

export async function CreateObjective(id, title, description, prediction) {
  const request = {
    title,
    description,
    prediction,
  };

  let response = await api.post(`${id}/objective`, request, {
    headers: Auth(),
  });

  return response ? response : [];
}

export async function UpdateObjective(
  id,
  title,
  description,
  prediction,
  completed
) {
  const resquest = {
    title,
    description,
    prediction,
    completed,
  };

  let response = await api.put(`${id}/objective`, resquest, {
    headers: Auth(),
  });

  return response ? response : [];
}

export async function DeleteObjective(id) {
  const response = await api.delete(`/${id}/objective`, { headers: Auth() });

  return response ? response : {};
}
