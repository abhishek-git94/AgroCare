export default function VoiceWidget() {
  return (
    <button
      type="button"
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        borderRadius: "50%",
        width: 56,
        height: 56,
        border: "none",
        background: "#2563eb",
        color: "white",
        cursor: "pointer",
        boxShadow: "0 10px 20px rgba(37, 99, 235, 0.25)",
      }}
    >
      🎤
    </button>
  );
}
