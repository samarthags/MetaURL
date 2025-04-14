import Head from 'next/head';

export default function NamePage({ name }) {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta property="og:title" content={name} />
        <meta property="og:description" content={`Welcome to ${name}'s page`} />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:url" content={`https://ammu.vercel.app/${name}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div style={{
        display: 'flex', justifyContent: 'center',
        alignItems: 'center', height: '100vh',
        fontSize: '3rem'
      }}>
        {name}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.params;
  return {
    props: { name }
  };
}