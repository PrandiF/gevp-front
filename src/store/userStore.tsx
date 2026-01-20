import { create } from "zustand";
import { useEffect } from "react";

interface UserState {
  isAuthenticated: boolean;
  role: "empleado" | "socio" | null;
  loginState: (role: "empleado" | "socio") => void;
  logoutState: () => void;
}

const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  role: null,
  loginState: (role: "empleado" | "socio") => {
    set({ isAuthenticated: true, role });
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
  },
  logoutState: () => {
    set({ isAuthenticated: false, role: null });
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("userRole");
  },
}));

export const useUserStoreLocalStorage = () => {
  const store = useUserStore();

  useEffect(() => {
    const isAuthenticatedFromStorage =
      localStorage.getItem("isAuthenticated") === "true";
    const roleFromStorage = localStorage.getItem("userRole") as
      | "empleado"
      | "socio"
      | null;

    if (
      store.isAuthenticated !== isAuthenticatedFromStorage ||
      store.role !== roleFromStorage
    ) {
      store.loginState(roleFromStorage || "socio");
    }
  }, [store.isAuthenticated, store.role]);

  return store;
};
