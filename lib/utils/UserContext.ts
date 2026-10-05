"use client";
import { createContext, Dispatch, SetStateAction } from "react";
import { UserProfile } from "../types/user-details";

type UserContextType = {
  userInfo: UserProfile | null;
  setUserInfo: Dispatch<SetStateAction<UserProfile | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
