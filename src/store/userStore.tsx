import { create } from "zustand";

interface UserState {
  isAuthenticated: boolean;
  loginState: () => void;
  logoutState: () => void;
}

const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  loginState: () => {
    set({ isAuthenticated: true });
    localStorage.setItem("isAuthenticated", "true");
  },
  logoutState: () => {
    set({ isAuthenticated: false });
    localStorage.setItem("isAuthenticated", "false");
  },
}));

export const useUserStoreLocalStorage = () => {
  const store = useUserStore();
  const isAuthenticatedFromStorage =
    localStorage.getItem("isAuthenticated") === "true";

  if (store.isAuthenticated !== isAuthenticatedFromStorage) {
    store.isAuthenticated = isAuthenticatedFromStorage;
  }

  return store;
};
