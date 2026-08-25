import { mockUser } from "@/data/user";
import { mockDelay } from "./api";

export const authService = {
  login: () => mockDelay({ user: mockUser, token: "mock-token" }, 450),
  register: () => mockDelay({ user: mockUser, token: "mock-token" }, 450),
  logout: () => mockDelay(true, 150),
};
