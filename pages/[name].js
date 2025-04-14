import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function NamePage({ name }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());

      // Update meta tags dynamically
      document.title = `${name} - ${time}`;

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', `${name} - ${time}`);

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', `Current time: ${time}`);

    }, 1000);

    return () => clearInterval(interval);
  }, [name]);

  return (
    <>
      <Head>
        <title>{name} - {time}</title>
        <meta property="og:title" content={`${name} - ${time}`} />
        <meta property="og:description" content={`Current time: ${time}`} />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:url" content={`https://ammu.vercel.app/${name}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div style={{
        display: 'flex', justifyContent: 'center',
        alignItems: 'center', height: '100vh',
        fontSize: '3rem', flexDirection: 'column'
      }}>
        {name}
        <div style={{ fontSize: '1.5rem', marginTop: '1rem' }}>{time}</div>
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