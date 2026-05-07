export default function Home() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '2rem',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      Try:<br />
      <code>/samarth?mood=🔥</code>
    </div>
  );
}