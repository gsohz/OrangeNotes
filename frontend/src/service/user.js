import api from "./api";

export default function Auth() {
  const user = JSON.parse(sessionStorage.getItem("@ogNotes")) || {};

  if (user && user.token) {
    console.log(user.id);
    return { Authorization: `Bearer ${user?.token}`, user: user.id };
  } else {
    return {};
  }
}

export async function Logar(email, password) {
  const request = {
    email,
    password,
  };

  const response = await api.post("/login", request);

  return response;
}

export async function Register(username, email, password) {
  const request = {
    username,
    email,
    password,
  };

  const response = await api.post("/registro", request);

  return response;
}
