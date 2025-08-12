// components/EmojiLoader.js
export default function EmojiLoader() {
  const loaderContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#121212",
    color: "#eee",
    fontSize: "18px",
    flexDirection: "column",
  };

  const emojiStyle = {
    position: "relative",
    fontSize: "64px",
    lineHeight: "1",
    display: "inline-block",
    width: "64px",
    height: "64px",
    textAlign: "center",
    overflow: "hidden",
  };

  const animatedFillStyle = {
    content: '""',
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(to top, #0066cc 0%, #00aaff 40%, #00cc88 70%, #00e676 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "fillUp 2s infinite",
  };

  return (
    <div style={loaderContainerStyle}>
      <div style={emojiStyle}>
        <span style={{ position: "relative", zIndex: 2 }}></span>
        <span style={animatedFillStyle}>🌍</span>
      </div>
      <div style={{ marginTop: "12px" }}>Yükleniyor...</div>

      <style>
        {`
        @keyframes fillUp {
          0% { top: 100%; }
          100% { top: 0%; }
        }
        `}
      </style>
    </div>
  );
}
