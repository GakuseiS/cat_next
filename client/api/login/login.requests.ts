import { LoginParams } from "./login.types";

export const postLogin = async (params: LoginParams) => {
  const res = await fetch("http://localhost:3001/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return {body: await res.json(), status: res.status}
}