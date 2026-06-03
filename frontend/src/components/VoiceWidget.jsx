import { useState, useRef, useCallback } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function VoiceWidget() {
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const speak = useCallback((text, lang = "hi-IN") => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = 0.9;
    speechSynthesis.speak(utter);
  }, []);

  const sendToBackend = useCallback(async (text) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/voice/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language: "hi" }),
      });
      const data = await res.json();
      speak(data.spoken_response_text);
    } catch {
      speak("सर्वर से कनेक्शन नहीं हो पाया।");
    }
    setLoading(false);
    setListening(false);
    setFallback(false);
    setInput("");
  }, [speak]);

  const startListening = useCallback(() => {
    if (!SpeechRecognition) {
      setFallback(true);
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setListening(false);
      sendToBackend(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
      setFallback(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    recognition.onend = () => {
      if (listening) setListening(false);
    };

    recognition.start();
  }, [listening, sendToBackend]);

  const handleSubmit = () => {
    if (input.trim()) sendToBackend(input.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <>
      {fallback && (
        <div
          style={{
            position: "fixed",
            right: 24,
            bottom: 90,
            background: "white",
            borderRadius: 16,
            padding: 16,
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: 280,
            zIndex: 999,
          }}
        >
          <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>
            माइक नहीं चला। नीचे लिखें:
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="यहाँ लिखें..."
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #d1d5db",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            style={{
              padding: "10px",
              borderRadius: 10,
              border: "none",
              background: loading ? "#9ca3af" : "#2563eb",
              color: "white",
              fontWeight: 600,
              cursor: loading ? "default" : "pointer",
              fontSize: 14,
            }}
          >
            {loading ? "..." : "भेजें"}
          </button>
        </div>
      )}
      {listening && (
        <div
          style={{
            position: "fixed",
            right: 24,
            bottom: 90,
            background: "#dc2626",
            color: "white",
            borderRadius: 16,
            padding: "12px 20px",
            boxShadow: "0 8px 30px rgba(220, 38, 38, 0.3)",
            fontSize: 14,
            fontWeight: 600,
            zIndex: 999,
            animation: "pulse 1s infinite",
          }}
        >
          🔊 सुन रहा हूँ... बोलिए
        </div>
      )}
      <button
        type="button"
        onClick={fallback ? () => setFallback(false) : startListening}
        onContextMenu={(e) => { e.preventDefault(); setFallback(true); }}
        title={listening ? "सुन रहा हूँ..." : "बोलें"}
        style={{
          position: "fixed",
          right: 24,
          bottom: 24,
          borderRadius: "50%",
          width: 64,
          height: 64,
          border: "none",
          background: listening ? "#dc2626" : "#2563eb",
          color: "white",
          cursor: "pointer",
          boxShadow: listening
            ? "0 0 0 12px rgba(220, 38, 38, 0.25)"
            : "0 10px 20px rgba(37, 99, 235, 0.25)",
          fontSize: 28,
          transition: "all 0.3s",
        }}
      >
        {loading ? "⏳" : listening ? "🔴" : "🎤"}
      </button>
    </>
  );
}
