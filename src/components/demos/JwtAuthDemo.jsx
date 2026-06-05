import { useState } from "react";
import { D, mono } from "../../tokens";

export default function JwtAuthDemo() {
  const [token, setToken] = useState(null);
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState([]);
  const addLog = (msg, color="#14b8a6") => setLog(p => [...p, { msg, color }]);
  const fakeToken = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImV4cCI6MTcwMDAwMH0.SIGNATURE";
  const login = async () => {
    setRunning(true); setLog([]); setToken(null);
    addLog("POST /auth/login  { email, password }", "#3b82f6");
    await new Promise(r => setTimeout(r, 500));
    addLog("✅ Credentials verified against DB", D.green);
    await new Promise(r => setTimeout(r, 400));
    addLog("🔑 jwt.sign({ userId:1, role:'admin' }, SECRET, { expiresIn:'1h' })", "#f59e0b");
    await new Promise(r => setTimeout(r, 400));
    setToken(fakeToken);
    addLog("✅ JWT returned → client stores in httpOnly cookie", D.green);
    setRunning(false);
  };
  const request = async () => {
    if (!token) return;
    setRunning(true);
    setLog([]);
    addLog("GET /api/dashboard  Authorization: Bearer <token>", "#3b82f6");
    await new Promise(r => setTimeout(r, 400));
    addLog("🔍 Middleware: jwt.verify(token, SECRET)", "#f59e0b");
    await new Promise(r => setTimeout(r, 500));
    addLog("✅ Token valid! Payload: { userId:1, role:'admin', exp:... }", D.green);
    await new Promise(r => setTimeout(r, 300));
    addLog("🎯 req.user = { userId:1, role:'admin' } — route handler called", D.green);
    setRunning(false);
  };
  const expired = async () => {
    setRunning(true); setLog([]);
    addLog("GET /api/dashboard  Authorization: Bearer <expired_token>", "#3b82f6");
    await new Promise(r => setTimeout(r, 400));
    addLog("🔍 Middleware: jwt.verify(token, SECRET)", "#f59e0b");
    await new Promise(r => setTimeout(r, 500));
    addLog("❌ JsonWebTokenError: jwt expired", D.red);
    await new Promise(r => setTimeout(r, 300));
    addLog("→ 401 Unauthorized  { error: 'Token expired' }", D.red);
    setRunning(false);
  };
  return (
    <div style={{ padding: 14, background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 10 }}>
      <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, letterSpacing: 1, marginBottom: 10 }}>🧪 LIVE — JWT auth flow simulator</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <button onClick={login} disabled={running} style={{ padding: "6px 14px", background: D.green, color: "#fff", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 11, fontFamily: mono, opacity: running ? 0.7 : 1 }}>1. Login</button>
        <button onClick={request} disabled={running || !token} style={{ padding: "6px 14px", background: token ? "#3b82f6" : D.surface, color: token ? "#fff" : D.muted, border: `1px solid ${token ? "#3b82f6" : D.outline}`, borderRadius: 5, cursor: token ? "pointer" : "default", fontSize: 11, fontFamily: mono, opacity: running ? 0.7 : 1 }}>2. Protected Request</button>
        <button onClick={expired} disabled={running} style={{ padding: "6px 14px", background: "transparent", border: `1px solid ${D.red}`, color: D.red, borderRadius: 5, cursor: "pointer", fontSize: 11, fontFamily: mono, opacity: running ? 0.7 : 1 }}>3. Expired Token</button>
      </div>
      {token && (
        <div style={{ marginBottom: 10, padding: "6px 10px", background: "#f59e0b0d", border: "1px solid #f59e0b33", borderRadius: 5, wordBreak: "break-all" }}>
          <div style={{ fontSize: 9, color: "#f59e0b", fontFamily: mono, marginBottom: 2 }}>JWT TOKEN</div>
          <div style={{ fontSize: 9, fontFamily: mono, color: D.muted }}>{token}</div>
        </div>
      )}
      <div style={{ background: "#000", borderRadius: 6, padding: "8px 10px", minHeight: 70 }}>
        {log.map((l, i) => <div key={i} style={{ fontSize: 10, fontFamily: mono, color: l.color, lineHeight: 1.9 }}>{l.msg}</div>)}
      </div>
    </div>
  );
}
