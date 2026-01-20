import { create } from "zustand";

interface UserState {
  isAuthenticated: boolean;
  role: "admin" | "socio" | null;
  hasHydrated: boolean;
  loginState: (role: "admin" | "socio") => void;
  logoutState: () => void;
  hydrate: () => void;
}

export const useUserStoreLocalStorage = create<UserState>((set) => ({
  isAuthenticated: false,
  role: null,
  hasHydrated: false,

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

  hydrate: () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const role = localStorage.getItem("userRole") as "admin" | "socio" | null;

    if (isAuthenticated && role) {
      set({ isAuthenticated: true, role, hasHydrated: true });
    } else {
      set({ hasHydrated: true });
    }
  },
}));
