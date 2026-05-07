import Head from 'next/head';

export default function NamePage({ name, status, role }) {

  const cleanName = name.charAt(0).toUpperCase() + name.slice(1);

  const finalStatus = status || "building cool stuff";
  const finalRole = role || "developer";

  const title = `${cleanName} | ${finalRole}`;
  const description = `${cleanName} is currently ${finalStatus}.`;

  const url = `https://sammuurl.vercel.app/${name}`;

  return (
    <>
      <Head>
        {/* Basic */}
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph (for WhatsApp, Discord, LinkedIn) */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <div style={{
        background: '#0d1117',
        color: '#c9d1d9',
        minHeight: '100vh',
        padding: '40px',
        fontFamily: 'monospace'
      }}>
        <div style={{ maxWidth: '600px', margin: 'auto' }}>

          <p style={{ color: '#8b949e' }}>$ whoami</p>
          <h1 style={{ margin: 0 }}>{cleanName}</h1>

          <br />

          <p style={{ color: '#8b949e' }}>$ role</p>
          <p>{finalRole}</p>

          <br />

          <p style={{ color: '#8b949e' }}>$ status</p>
          <p>{finalStatus}</p>

          <br />

          <p style={{ color: '#8b949e' }}>$ endpoint</p>
          <p>/{name}</p>

          <br />

          <p style={{ color: '#8b949e' }}>$ share</p>
          <p>{url}</p>

        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.params;
  const { status, role } = context.query;

  return {
    props: {
      name,
      status: status || null,
      role: role || null
    }
  };
}