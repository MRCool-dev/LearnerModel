import { useState } from "react";
import { D, mono, serif } from "../../tokens";

export default function QuizCard({ question, options, correct, explain }) {
  const [chosen, setChosen] = useState(null);
  return (
    <div style={{ margin: "12px 0", padding: "13px 16px", background: D.surfaceLowest, border: `1px solid ${D.outline}`, borderRadius: 9 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: D.text, fontFamily: serif, marginBottom: 10 }}>❓ {question}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {options.map((opt, i) => {
          const isChosen = chosen === i;
          const isCorrect = i === correct;
          const showResult = chosen !== null;
          let bg = "transparent", border = D.outline, color = D.muted;
          if (showResult && isCorrect) { bg = D.greenBg; border = D.green; color = D.greenText; }
          else if (showResult && isChosen && !isCorrect) { bg = D.red + "18"; border = D.red; color = D.red; }
          return (
            <button key={i} onClick={() => chosen === null && setChosen(i)}
              style={{ padding: "7px 12px", background: bg, border: `1px solid ${border}`, borderRadius: 5, cursor: chosen === null ? "pointer" : "default", textAlign: "left", fontSize: 12, color, fontFamily: serif, transition: "all 0.2s" }}>
              {showResult && isCorrect ? "✅ " : showResult && isChosen ? "❌ " : "○ "}{opt}
            </button>
          );
        })}
      </div>
      {chosen !== null && (
        <div style={{ marginTop: 10, padding: "8px 10px", background: D.greenBg, border: `1px solid ${D.green}22`, borderRadius: 5, fontSize: 11, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>
          💬 {explain}
        </div>
      )}
      {chosen !== null && <button onClick={() => setChosen(null)} style={{ marginTop: 8, padding: "3px 10px", background: "transparent", border: `1px solid ${D.outline}`, borderRadius: 4, cursor: "pointer", fontSize: 10, color: D.muted, fontFamily: mono }}>reset</button>}
    </div>
  );
}
