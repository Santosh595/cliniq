import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Role = "patient" | "doctor" | "admin" | null;

interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

interface AuthState {
  // persisted state
  user: User | null;
  role: Role;
  token: string | null;

  // non-persisted / UI flags
  hydrated: boolean;

  // actions
  login: (payload: { user: User; role: Role; token?: string }) => void;
  logout: () => void;
  setRole: (role: Role) => void;
  setUser: (user: User | null) => void;
}

// ✅ Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      role: null,
      token: null,
      hydrated: false,

      // login updates user, role, and token
      login: ({ user, role, token }) => {
        set({ user, role, token: token ?? null });
      },

      // logout clears everything
      logout: () => {
        set({ user: null, role: null, token: null });
      },

      setRole: (role) => set({ role }),
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage", // storage key
      storage: createJSONStorage(() => AsyncStorage),

      // persist only these keys
      partialize: (state) => ({
        user: state.user,
        role: state.role,
        token: state.token,
      }),

      // 👇 hydration handling
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Error during hydration", error);
        }
        // when hydration finishes, set hydrated = true
        useAuthStore.setState({ hydrated: true });
      },
    }
  )
);
