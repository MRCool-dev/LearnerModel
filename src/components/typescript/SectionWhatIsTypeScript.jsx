import { useState } from "react";
import { D, mono, para } from "../../tokens";
import BigIdea from "../primitives/BigIdea";
import EasyBox from "../primitives/EasyBox";
import QuizCard from "../primitives/QuizCard";
import Tip from "../primitives/Tip";
import TypeScriptErrorDemo from "../demos/TypeScriptErrorDemo";

export default function SectionWhatIsTypeScript() {
  const [tab, setTab] = useState("story");
  const tabs = [
    { id: "story", label: "📖 The Story" },
    { id: "why", label: "🎯 Why TypeScript?" },
    { id: "demo", label: "🧪 Live Demo" },
    { id: "quiz", label: "🧠 Quiz" },
  ];
  return (
    <div>
      <p style={para}>TypeScript is JavaScript with types. It compiles to plain JavaScript but catches bugs at compile time — before your code ever runs.</p>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {tabs.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "5px 12px", fontSize: 11, fontFamily: mono, background: tab === t.id ? "#3b82f622" : "transparent", border: `1px solid ${tab === t.id ? "#3b82f6" : D.outline}`, color: tab === t.id ? "#3b82f6" : D.muted, borderRadius: 5, cursor: "pointer" }}>{t.label}</button>)}
      </div>
      {tab === "story" && (
        <div>
          <BigIdea number="1" title="JavaScript is dynamically typed" color="#f59e0b">In JavaScript, a variable can hold a string, then a number, then an object, all in the same function. This flexibility is powerful but dangerous. A typo like `user.nmae` does not fail until runtime — when a real user is trying to log in.</BigIdea>
          <BigIdea number="2" title="Microsoft created TypeScript in 2012" color="#3b82f6">Anders Hejlsberg, the creator of C#, led the TypeScript team at Microsoft. Their goal: bring static types to JavaScript without changing how it runs. TypeScript is a superset of JavaScript — every valid JS file is valid TS. The compiler simply strips types and outputs plain JS.</BigIdea>
          <BigIdea number="3" title="TypeScript is now the industry standard" color={D.green}>In 2024, TypeScript is the #3 most popular language on GitHub. Virtually every major framework (React, Vue, Angular, Next.js, NestJS) recommends or requires TypeScript. Job postings for Node.js developers almost always list TypeScript as a requirement.</BigIdea>
          <EasyBox emoji="🎯" title="One sentence" color="#3b82f6"><strong>TypeScript is a type layer on top of JavaScript</strong> that catches bugs at compile time, enables precise autocomplete, and makes refactoring safe. It compiles to plain JavaScript and runs everywhere JS runs.</EasyBox>
        </div>
      )}
      {tab === "why" && (
        <div>
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: mono, fontSize: 11 }}>
              <thead><tr>{["", "JavaScript", "TypeScript"].map((h, i) => (
                <th key={i} style={{ padding: "9px 12px", background: D.surface, color: [D.muted, "#f59e0b", "#3b82f6"][i], textAlign: "left", borderBottom: `1px solid ${D.outline}`, fontSize: 10 }}>{h}</th>
              ))}</tr></thead>
              <tbody>
                {[["Typos","Runtime crash","Compile-time error"],["Refactoring","Scary — find broken references manually","Safe — TS shows every broken reference"],["Autocomplete","Guesswork based on usage","Precise — knows every property and method"],["Documentation","Comments that go stale","Types that are always correct"],["Team scaling","Hard for new developers","Easy — types act as documentation"],["Bug catching","At runtime (user sees it)","At compile time (developer fixes it)"]].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : D.surface + "06" }}>
                    {row.map((cell, j) => <td key={j} style={{ padding: "8px 12px", borderBottom: `1px solid ${D.outline}`, color: j === 0 ? D.text : D.muted }}>{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Tip icon="🎯" color={D.yellow} title="When NOT to use TypeScript">For tiny scripts, one-off tools, or rapid prototyping where speed matters more than correctness, plain JavaScript is fine. For production applications, APIs, and team projects, TypeScript pays for itself within days.</Tip>
        </div>
      )}
      {tab === "demo" && <TypeScriptErrorDemo />}
      {tab === "quiz" && (
        <div>
          <QuizCard question="What does TypeScript compile to?" options={["Java bytecode", "Plain JavaScript", "WebAssembly", "Python"]} correct={1} explain="The TypeScript compiler (tsc) strips all type annotations and outputs plain JavaScript. TypeScript is a compile-time layer — it does not exist at runtime." />
          <QuizCard question="When does TypeScript catch a typo like user.nmae?" options={["At runtime", "At compile time", "When the user reports it", "Never"]} correct={1} explain="TypeScript analyzes your code during compilation and reports 'Property nmae does not exist on type { name: string }'. You fix it before deployment." />
          <QuizCard question="Is every valid JavaScript file also valid TypeScript?" options={["No — TS is a different language", "Yes — TS is a superset of JS", "Only if you add types", "Only for ES6+ code"]} correct={1} explain="TypeScript is a superset of JavaScript. Any valid .js file is also valid .ts (though TS may warn about implicit any types). You can adopt TS incrementally." />
        </div>
      )}
    </div>
  );
}
