"use client";
import { createContext, Dispatch, SetStateAction } from "react";
import { UserProfile } from "@/lib/types/user-details";

type UserContextType = {
  userInfo: UserProfile;
  setUserInfo: Dispatch<SetStateAction<UserProfile | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
