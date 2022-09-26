import { createContext, ReactNode, useContext, useMemo } from "react";
import { useFetch } from "libs/development-kit";
import { AuthorizedUser, AuthService } from "../services";

const useAuth = () => {
  const [state, authorize] = useFetch<AuthorizedUser>();

  const start = () => {
    authorize(AuthService.authorize);
  };

  const ctx = useMemo(
    () => ({
      state,
      start,
    }),
    [state]
  );

  return ctx;
};

const Context = createContext<ReturnType<typeof useAuth> | undefined>(
  undefined
);

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const ctx = useAuth();

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(Context);

  if (!ctx) {
    throw new Error("Missing provider");
  }

  return ctx;
};
