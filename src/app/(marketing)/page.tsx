import { api } from "~/trpc/server";

const Marketing = async () => {
  const hello = await api.welcome.hello({ text: "from tRPC" });

  return (
    <div>
      <p>{hello ? hello.greeting : "Loading tRPC query..."}</p>
    </div>
  );
};

export default Marketing;
