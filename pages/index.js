export default function Home() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0d1117',
      color: '#c9d1d9',
      fontFamily: 'monospace'
    }}>
      <div>
        <p>Usage:</p>
        <code>/samarth?status=building&role=dev</code>
      </div>
    </div>
  );
}