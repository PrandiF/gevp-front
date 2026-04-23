import { create } from "zustand";

interface UserState {
  isAuthenticated: boolean;
  role: "admin" | "entrenador" | null;
  sport: string | null;

  loginState: (role: "admin" | "entrenador", sport?: string | null) => void;
  logoutState: () => void;
}

/* =========================
   INIT DESDE LOCALSTORAGE
========================= */

const storedAuth = localStorage.getItem("isAuthenticated") === "true";
const storedRole = localStorage.getItem("userRole") as
  | "admin"
  | "entrenador"
  | null;
const storedSport = localStorage.getItem("userSport");

export const useUserStoreLocalStorage = create<UserState>((set) => ({
  isAuthenticated: storedAuth || false,
  role: storedRole || null,
  sport: storedSport || null,

  /* =========================
     LOGIN
  ========================= */

  loginState: (role, sport = null) => {
    set({
      isAuthenticated: true,
      role,
      sport,
    });

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);

    if (sport) {
      localStorage.setItem("userSport", sport);
    } else {
      localStorage.removeItem("userSport"); // 🔥 FIX
    }
  },

  /* =========================
     LOGOUT
  ========================= */

  logoutState: () => {
    set({
      isAuthenticated: false,
      role: null,
      sport: null,
    });

    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userSport");
  },
}));
