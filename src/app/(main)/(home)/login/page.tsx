import LoginPage from './_componentss/login';

type PageProps = {
  searchParams: Promise<{
    redirect?: string | string[];
  }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const redirect =
    typeof params.redirect === 'string'
      ? params.redirect
      : undefined;

  return <LoginPage redirect={redirect} />;
};

export default Page;
