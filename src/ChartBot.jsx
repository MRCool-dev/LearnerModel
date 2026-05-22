import { useState, useRef, useEffect } from "react";
import Groq from "groq-sdk";

const colors = {
  primary: "#2563eb",
  primaryLight: "#3b82f6",
  primaryDark: "#1e40af",
  bg: "#ffffff",
  surface: "#f8fafc",
  border: "#e2e8f0",
  text: "#1e293b",
  textMuted: "#64748b",
  botBg: "#eff6ff",
  userBg: "#2563eb",
  error: "#dc2626",
  success: "#16a34a",
};

const fonts = {
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'Fira Code', 'Courier New', monospace",
};

export default function ChartBot() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! 👋 I'm your Chart Bot. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const genAI = useRef(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
      setError("Groq API key not found. Add VITE_GROQ_API_KEY to .env.local");
      return;
    }
    genAI.current = new Groq({ apiKey, dangerouslyAllowBrowser: true });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!genAI.current) {
      setError("API not initialized");
      return;
    }

    const userMessage = { role: "user", text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const systemPrompt = `You are a helpful expert. Answer questions briefly and clearly.
CRITICAL RULES:
1. Keep response to ONE SHORT MESSAGE ONLY
2. NO tables, NO multiple sections, NO excessive formatting
3. Max 200 words per response
4. Simple paragraphs only
5. Use plain language - no fancy markdown
Answer concisely like a friendly expert.`;

      const conversationHistory = messages
        .filter(m => m.text)
        .map(m => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.text
        }));

      const response = await genAI.current.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: systemPrompt },
          ...conversationHistory,
          { role: "user", content: input }
        ],
        max_tokens: 2000,
        temperature: 0.7
      });

      let cleanedText = response.choices[0].message.content;

      // Simple cleanup - keep it clean and readable
      cleanedText = cleanedText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n\n')
        .substring(0, 1000); // Cap at 1000 chars for one message

      // Send as ONE message
      const botMessage = {
        role: "bot",
        text: cleanedText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errMsg = err.message || "Failed to get response";
      setError(errMsg);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: `Error: ${errMsg}. Please check your API key.`, timestamp: new Date() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      backgroundColor: colors.bg,
      fontFamily: fonts.body
    }}>
      {/* Header */}
      <div style={{
        padding: "16px 20px",
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
        color: "white",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        borderBottom: `1px solid ${colors.primaryDark}`
      }}>
        <h1 style={{
          margin: 0,
          fontSize: "18px",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          📊 Chart Bot
        </h1>
        <p style={{
          margin: "4px 0 0",
          fontSize: "12px",
          opacity: 0.9,
          fontWeight: "400"
        }}>
          Powered by Groq (GPT OSS 20B)
        </p>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: colors.surface
      }}>
        {error && (
          <div style={{
            padding: "12px 14px",
            background: "#fee2e2",
            border: `1px solid #fecaca`,
            borderRadius: "8px",
            color: colors.error,
            fontSize: "13px",
            fontWeight: "500"
          }}>
            ⚠️ {error}
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              gap: "8px"
            }}
          >
            {msg.role === "bot" && (
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: colors.primary,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                flexShrink: 0,
                marginTop: "2px"
              }}>
                🤖
              </div>
            )}
            <div style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "75%",
              gap: "4px"
            }}>
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: msg.role === "user" ? colors.userBg : colors.botBg,
                  color: msg.role === "user" ? "white" : colors.text,
                  fontSize: "13px",
                  lineHeight: "1.5",
                  wordWrap: "break-word",
                  border: msg.role === "user" ? "none" : `1px solid ${colors.border}`,
                  whiteSpace: "pre-wrap"
                }}
              >
                {msg.text}
              </div>
              {msg.timestamp && (
                <div style={{
                  fontSize: "11px",
                  color: colors.textMuted,
                  paddingLeft: msg.role === "bot" ? "36px" : "0",
                  textAlign: msg.role === "user" ? "right" : "left"
                }}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{
            display: "flex",
            gap: "6px",
            alignItems: "center",
            padding: "12px 14px",
            background: colors.botBg,
            borderRadius: "10px",
            width: "fit-content"
          }}>
            <div style={{ display: "flex", gap: "3px" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: colors.primary,
                    animation: `bounce 1.4s infinite ${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: "12px", color: colors.textMuted }}>Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "12px 16px",
        background: colors.bg,
        borderTop: `1px solid ${colors.border}`,
        boxShadow: "0 -1px 3px rgba(0,0,0,0.05)"
      }}>
        <form onSubmit={sendMessage} style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask about charts, data visualization..."
            style={{
              flex: 1,
              padding: "10px 12px",
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
              fontSize: "13px",
              fontFamily: fonts.body,
              outline: "none",
              backgroundColor: colors.surface,
              color: colors.text,
              transition: "all 0.2s",
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "text"
            }}
            onFocus={(e) => {
              e.target.style.borderColor = colors.primary;
              e.target.style.boxShadow = `0 0 0 3px ${colors.primary}20`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.border;
              e.target.style.boxShadow = "none";
            }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{
              padding: "10px 16px",
              background: loading || !input.trim() ? colors.textMuted : colors.primary,
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              fontFamily: fonts.body,
              transition: "all 0.2s",
              whiteSpace: "nowrap"
            }}
            onMouseEnter={(e) => {
              if (!loading && input.trim()) {
                e.target.style.background = colors.primaryDark;
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && input.trim()) {
                e.target.style.background = colors.primary;
              }
            }}
          >
            {loading ? "⏳" : "→"}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: ${colors.border};
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${colors.textMuted};
        }
      `}</style>
    </div>
  );
}
