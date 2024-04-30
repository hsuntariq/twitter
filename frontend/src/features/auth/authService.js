import axios from "axios";

const base_url = "http://localhost:3001/api/users";

// make a function, that requests the register api

export const registerUser = async (userData) => {
  const response = await axios.post(`${base_url}/register-user`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
