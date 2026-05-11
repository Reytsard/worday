export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--brutal-bg)",
        color: "var(--brutal-text)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--brutal-font)",
      }}
    >
      <p
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          margin: 0,
        }}
      >
        LOADING
        <span
          style={{
            display: "inline-block",
            animation: "blink 1s step-start infinite",
          }}
        >
          _
        </span>
      </p>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
