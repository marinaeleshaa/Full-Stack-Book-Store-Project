import type { IUser } from "../Interfaces";
import axios from "axios";

type ErrorResponse = {
  error: string;
};

export const AddUser = async (userData: IUser) => {
  try {
    const res = await axios.post("/api/auth/signup", userData);
    return res.data;
  } catch (error) {
    // نعرف إنه ممكن يكون axios error
    const err = error as { response?: { data?: ErrorResponse } };
    // console.log(error)
    if (err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }

    throw new Error("Network error");
  }
};

export const UserLoginRequest = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post<{ jwt: string }>("/api/auth/login", data);

    const token = res.data.jwt; // ده string
    return token;
  } catch (error) {
    const err = error as { response?: { data?: ErrorResponse } };
    if (err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error("Network error");
  }
};

export const GetAllUsers = async () => {
  try {
    const res = await axios.get("/api/users", {
      headers: { authorization: localStorage.getItem("userToken") },
    });

    return res.data;
  } catch (error) {
    return error;
  }
};

export const UpdateUserRoleRequest = async (
  _id: string,
  role: "user" | "admin"
) => {
  try {
    const res = await axios.patch(
      `/api/users/${_id}/role`,
      { role }, // مش محتاج تبعت _id تاني في البودي
      {
        headers: { authorization: localStorage.getItem("userToken") },
      }
    );

    // دلوقتي الـ backend بيرجع { updatedUser, jwt }
    return res.data as { updatedUser: IUser; jwt: string };
  } catch (error) {
    const err = error as { response?: { data?: { error: string } } };
    throw new Error(err.response?.data?.error || "Failed to update role");
  }
};
