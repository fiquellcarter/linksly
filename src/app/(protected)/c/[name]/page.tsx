type Props = {
  params: Promise<{
    name: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { name } = await params;

  return (
    <div>
      <p>{name}</p>
    </div>
  );
};

export default Page;
