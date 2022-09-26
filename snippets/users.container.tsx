import { UsersListComponent } from "../components";
import { useUsersFetch } from "../logic";

export const UsersContainer = () => {
  const [usersState] = useUsersFetch();

  return <UsersListComponent state={usersState} onItemClick={() => {}} />;
};
