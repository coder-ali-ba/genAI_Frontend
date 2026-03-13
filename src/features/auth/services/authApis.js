import axios from "axios";

export const register = async ({ userName, email, password }) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/register",
      {
        userName,
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
