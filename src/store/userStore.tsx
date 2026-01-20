import { create } from "zustand";

interface UserState {
  isAuthenticated: boolean;
  role: "empleado" | "socio" | null;
  hasHydrated: boolean;
  loginState: (role: "empleado" | "socio") => void;
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
    const role = localStorage.getItem("userRole") as
      | "empleado"
      | "socio"
      | null;

    if (isAuthenticated && role) {
      set({ isAuthenticated: true, role, hasHydrated: true });
    } else {
      set({ hasHydrated: true });
    }
  },
}));
