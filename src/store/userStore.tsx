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

  loginState: (role) => {
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

    // 🔒 Hidratamos SOLO si hay datos reales
    if (isAuthenticatedFromStorage && roleFromStorage) {
      store.loginState(roleFromStorage);
    }
  }, []);

  return store;
};
