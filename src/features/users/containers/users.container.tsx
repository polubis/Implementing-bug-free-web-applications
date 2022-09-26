import { Message } from "libs/ui";
import { useEffect } from "react";
import { useAuthContext } from "shared/auth";
import { UsersListComponent } from "../components";
import { useUsersFetch } from "../logic";

const UsersListContainer = () => {
  const [usersState] = useUsersFetch();
  return <UsersListComponent state={usersState} onItemClick={() => {}} />;
};

export const UsersContainer = () => {
  const authCtx = useAuthContext();

  useEffect(authCtx.start, []);

  if (authCtx.state.type === "done") {
    return <UsersListContainer />;
  }

  if (authCtx.state.type === "pending") {
    return <Message content="Authorizing..." />;
  }

  return null;
};
