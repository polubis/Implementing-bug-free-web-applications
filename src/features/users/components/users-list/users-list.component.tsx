import { Renderer, State } from "libs/development-kit";
import { AvatarsGrid, ErrorMessage } from "libs/ui";
import css from "./style.module.scss";

interface UsersListItem {
  id: string;
  avatar: string;
  name: string;
}

interface UsersListComponentProps {
  state: State<UsersListItem[]>;
  onItemClick: (id: UsersListItem["id"]) => void;
}

export const UsersListComponent = ({
  state,
  onItemClick,
}: UsersListComponentProps) => {
  return (
    <div className={css.layout}>
      <Renderer<UsersListItem[]>
        state={state}
        fail={(error) => <ErrorMessage error={error} />}
        pending={() => <AvatarsGrid loading />}
      >
        {(data) => (
          <AvatarsGrid>
            {data.map((user) => (
              <img
                key={user.id}
                src={user.avatar}
                alt={user.name}
                onClick={() => onItemClick(user.id)}
              />
            ))}
          </AvatarsGrid>
        )}
      </Renderer>
    </div>
  );
};
