import { AuthProvider, AuthProviderProps } from "./logic";

export const AuthModule = ({ children }: AuthProviderProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};
