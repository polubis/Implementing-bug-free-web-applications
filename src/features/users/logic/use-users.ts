import { useFetch } from "libs/development-kit";
import { useEffect } from "react";
import { User, UsersService } from "../services";

export const useUsersFetch = () => {
  const [usersState, fetchUsers] = useFetch<User[]>();

  useEffect(() => {
    fetchUsers(UsersService.getMany);
  }, []);

  return [usersState] as const;
};
