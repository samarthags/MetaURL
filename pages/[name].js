import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function NamePage({ name, mood }) {
  const [time, setTime] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bgIndex, setBgIndex] = useState(0);
  const [ripples, setRipples] = useState([]);

  const gradients = [
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #ff9a9e, #fad0c4)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #fa709a, #fee140)',
  ];

  const emojis = ['✨', '🔥', '💫', '⚡', '🌈'];

  // ⏳ Live clock
  useEffect(() => {
    const interval = setInterval(() => {
      const t = new Date().toLocaleTimeString('en-IN');
      setTime(t);
      document.title = `${name} - ${t}`;
    }, 1000);
    return () => clearInterval(interval);
  }, [name]);

  // ✍️ Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayName(name.slice(0, i));
      i++;
      if (i > name.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, [name]);

  // 🎨 Auto background change
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % gradients.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 💥 Ripple effect
  const handleClick = (e) => {
    const newRipple = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);
    setBgIndex((bgIndex + 1) % gradients.length);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <>
      <Head>
        <title>{name} - {time}</title>
        <meta property="og:title" content={`${name} - ${time}`} />
        <meta property="og:description" content={`Mood: ${mood || 'cool'} | ${time}`} />
        <meta property="og:url" content={`https://sammuurl.vercel.app/${name}`} />
      </Head>

      <div
        onClick={handleClick}
        style={{
          height: '100vh',
          background: gradients[bgIndex],
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'sans-serif',
          overflow: 'hidden',
          position: 'relative',
          transition: '1s'
        }}
      >
        {/* 💥 Ripple */}
        {ripples.map(r => (
          <span
            key={r.id}
            style={{
              position: 'absolute',
              left: r.x,
              top: r.y,
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: 'white',
              transform: 'translate(-50%, -50%)',
              animation: 'ripple 0.6s linear'
            }}
          />
        ))}

        {/* ✨ Floating emojis */}
        {emojis.map((emoji, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${20 * i}%`,
              bottom: '-50px',
              fontSize: '2rem',
              animation: `floatUp ${5 + i}s linear infinite`
            }}
          >
            {emoji}
          </div>
        ))}

        {/* 🧊 Glass Card */}
        <div style={{
          backdropFilter: 'blur(20px)',
          background: 'rgba(255,255,255,0.1)',
          padding: '2rem 3rem',
          borderRadius: '20px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          zIndex: 2
        }}>
          <h1 style={{ fontSize: '3rem', margin: 0 }}>
            {displayName}
          </h1>

          <p style={{ marginTop: '10px' }}>
            Mood: {mood || '😎'}
          </p>

          <p style={{ fontSize: '1.5rem', marginTop: '10px' }}>
            {time}
          </p>

          <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            Click anywhere 💥
          </p>
        </div>

        {/* Animations */}
        <style jsx>{`
          @keyframes ripple {
            from {
              transform: scale(1);
              opacity: 0.6;
            }
            to {
              transform: scale(20);
              opacity: 0;
            }
          }

          @keyframes floatUp {
            from {
              transform: translateY(0);
              opacity: 1;
            }
            to {
              transform: translateY(-120vh);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { name } = context.params;
  const { mood } = context.query;

  return {
    props: {
      name,
      mood: mood || null
    }
  };
}