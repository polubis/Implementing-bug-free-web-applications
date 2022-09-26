// --- UsersPage.tsx ---
export const UsersPage = () => {
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [loadingUsersError, setLoadingUsersError] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const ctrl = new AbortController();

    const handleCall = async () => {
      setIsLoadingUsers(true);
      setLoadingUsersError("");
      setUsers([]);

      try {
        const response = await fetch("https://openapi.com/api/users");

        if (response.status < 200 || response.status >= 400) {
          throw new Error("Something went wrong");
        }

        const users = (await response.json()) as User[];

        setIsLoadingUsers(false);
        setUsers(users);
      } catch (error: unknown) {
        setIsLoadingUsers(false);
        setLoadingUsersError("Something went wrong");
      }
    };

    handleCall();

    return () => {
      ctrl.abort();
    };
  }, []);

  if (isLoadingUsers) {
    return (
      <>
        {Array.from({ length: 15 }).map((_, i) => (
          <div className={css.placeholder} />
        ))}
      </>
    );
  }

  if (!!loadingUsersError) {
    return <div className={css.error}>{loadingUsersError}</div>;
  }

  return (
    <div className={css.usersGrid}>
      {users.map((user) => (
        <figure key={user.props.src}>
          <img key={user.id} src={user.avatar} alt={user.name} />
        </figure>
      ))}
    </div>
  );
};
