// --- useUsersFetch.ts ---
export const useUsersFetch = () => {
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
        const users = await UsersService.getMany(ctrl.signal);
        
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

  return [isLoadingUsers, loadingUsersError, users];
};

// --- UsersPage.tsx ---
export const UsersPage = () => {
  const [isLoadingUsers, loadingUsersError, users] = useUsersFetch();

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
