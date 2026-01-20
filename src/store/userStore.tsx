import { create } from "zustand";

interface UserState {
  isAuthenticated: boolean;
  role: "admin" | "socio" | null;
  loginState: (role: "admin" | "socio") => void;
  logoutState: () => void;
}

export const useUserStoreLocalStorage = create<UserState>((set) => ({
  isAuthenticated: false,
  role: null,

  loginState: (role) => {
    set({ isAuthenticated: true, role });
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
  },

  logoutState: () => {
    set({ isAuthenticated: false, role: null });
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
  },
}));
