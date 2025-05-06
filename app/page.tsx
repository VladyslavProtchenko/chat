export type User = {
  id: number;
  username: string;
}
async function getUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`).then(res => res.json())
  console.log('response fetch users: ', res)
  return res
}

export default async function Home() {
  const users = await getUsers()

  return (
    <div className="container flex flex-col items-center gap-10 pt-20">
      users
      <div className="flex flex-col gap-4">
        {users.map((user: User) => (
          <div key={user.id}>{user.username}</div>
        ))}
      </div>
    </div>
  );
}
