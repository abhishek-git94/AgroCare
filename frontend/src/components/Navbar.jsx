export default function Navbar() {
  return (
    <header className="card" style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <h1>AgroSentinel Genesis AI</h1>
        <p>Real-time farming alerts, diagnostics, and scheme guidance.</p>
      </div>
      <div style={{ fontSize: 14, color: "#6b7280" }}>Status: Ready</div>
    </header>
  );
}
