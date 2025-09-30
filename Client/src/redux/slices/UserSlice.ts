// userSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../Interfaces";
import {
  GetAllUsers,
  UpdateUserRoleRequest,
  UserLoginRequest,
} from "../../handlers/UserApiHandler";

export interface UserState {
  isLogin: boolean;
  token: string;
  user: IUser | null;
  error: string;
  users: IUser[];
}

interface IJwtPayload {
  id: string;
  email: string;
  role: "user" | "admin";
  username?: string;
  iat?: number;
  exp?: number;
}

// login
export const LoginUserAction = createAsyncThunk(
  "user/loginRequest",
  async (data: { email: string; password: string }) => {
    const token = await UserLoginRequest(data);
    return token;
  }
);

// get all users
export const GetUsersAction = createAsyncThunk<IUser[]>(
  "user/GetUsers",
  async () => {
    const users = await GetAllUsers();
    console.log(users);
    return users as IUser[];
  }
);

export const UpdateUserRoleAction = createAsyncThunk<
  { updatedUser: IUser; jwt: string }, // ده اللي بيرجعه الـ API
  { id: string; role: "user" | "admin" }
>("user/updateRole", async ({ id, role }) => {
  const res = await UpdateUserRoleRequest(id, role);
  return res; // { updatedUser, jwt }
});

// initial state
const initialState: UserState = {
  isLogin: !!localStorage.getItem("token"),
  token: "",
  error: "",
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  users: [],
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LogOutAction: (state) => {
      state.isLogin = false;
      state.token = "";
      state.user = null;
      state.users = [];
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
    },
    isLoginCheck: (state) => {
      const token = localStorage.getItem("userToken");
      const user = localStorage.getItem("user");

      if (token && user) {
        state.isLogin = true;
        state.token = token;
        state.user = JSON.parse(user) as IUser;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(LoginUserAction.fulfilled, (state, action) => {
      state.isLogin = true;
      state.token = action.payload;
      localStorage.setItem("userToken", action.payload);

      try {
        const payload: IJwtPayload = JSON.parse(
          atob(action.payload.split(".")[1])
        );

        const mappedUser: IUser = {
          _id: payload.id,
          email: payload.email,
          username: payload.username || "",
          role: payload.role,
        };

        localStorage.setItem("user", JSON.stringify(mappedUser));
        state.user = mappedUser;
      } catch {
        state.error = "Invalid token format";
      }
    });

    builder.addCase(LoginUserAction.rejected, (state, action) => {
      state.error = action.error.message || "Login failed";
    });

    builder.addCase(GetUsersAction.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(UpdateUserRoleAction.fulfilled, (state, action) => {
      const { updatedUser, jwt } = action.payload;

      // عدل users list
      state.users = state.users.map((u) =>
        u._id === updatedUser._id ? updatedUser : u
      );

      // لو اليوزر الحالي هو اللي اتغير
      if (updatedUser._id === state.user?._id) {
        // Update state
        state.user = updatedUser;
        state.token = jwt;

        // Update localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("userToken", jwt);
      }
    });
  },
});

export const { LogOutAction, isLoginCheck } = UserSlice.actions;
export default UserSlice.reducer;
