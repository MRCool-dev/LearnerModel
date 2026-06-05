import { useState } from "react";
import { D, mono, display, serif } from "../tokens";
import ChartBot from "../ChartBot";

import SectionWhatIsNode from "./node/SectionWhatIsNode";
import SectionEventLoop from "./node/SectionEventLoop";
import SectionModules from "./node/SectionModules";
import SectionCoreModules from "./node/SectionCoreModules";
import KillNotes from "./node/KillNotes";
import SuperCheatsheet from "./node/SuperCheatsheet";
import InterviewSection from "./node/InterviewSection";

import SectionWhatIsExpress from "./express/SectionWhatIsExpress";
import SectionRouting from "./express/SectionRouting";
import SectionMiddleware from "./express/SectionMiddleware";
import SectionErrorHandling from "./express/SectionErrorHandling";
import SectionAuth from "./express/SectionAuth";
import SectionRestApi from "./express/SectionRestApi";
import ExpressKillNotes from "./express/ExpressKillNotes";
import ExpressInterview from "./express/ExpressInterview";

import SectionWhatIsDatabase from "./database/SectionWhatIsDatabase";
import SectionMongoDB from "./database/SectionMongoDB";
import SectionPostgreSQL from "./database/SectionPostgreSQL";
import SectionPrisma from "./database/SectionPrisma";
import SectionRedis from "./database/SectionRedis";
import SectionConnectionPooling from "./database/SectionConnectionPooling";
import DatabaseKillNotes from "./database/DatabaseKillNotes";
import DatabaseInterview from "./database/DatabaseInterview";

import SectionWhatIsTesting from "./testing/SectionWhatIsTesting";
import SectionJest from "./testing/SectionJest";
import SectionSupertest from "./testing/SectionSupertest";
import SectionIntegration from "./testing/SectionIntegration";
import SectionDebugging from "./testing/SectionDebugging";
import TestingKillNotes from "./testing/TestingKillNotes";
import TestingInterview from "./testing/TestingInterview";

import SectionWhatIsDevOps from "./devops/SectionWhatIsDevOps";
import SectionDocker from "./devops/SectionDocker";
import SectionPM2 from "./devops/SectionPM2";
import SectionNginx from "./devops/SectionNginx";
import SectionCICD from "./devops/SectionCICD";
import SectionMonitoring from "./devops/SectionMonitoring";
import DevOpsKillNotes from "./devops/DevOpsKillNotes";
import DevOpsInterview from "./devops/DevOpsInterview";

import SectionWhatIsTypeScript from "./typescript/SectionWhatIsTypeScript";
import SectionTypes from "./typescript/SectionTypes";
import SectionInterfaces from "./typescript/SectionInterfaces";
import SectionGenerics from "./typescript/SectionGenerics";
import SectionTsConfig from "./typescript/SectionTsConfig";
import SectionTypeSafeApi from "./typescript/SectionTypeSafeApi";
import TypeScriptKillNotes from "./typescript/TypeScriptKillNotes";
import TypeScriptInterview from "./typescript/TypeScriptInterview";

const NODE_SECTIONS = [
  { id: "what", icon: "🟢", title: "What is Node.js?", color: D.green, render: () => <SectionWhatIsNode /> },
  { id: "eventloop", icon: "🔄", title: "Event Loop", color: "#f59e0b", render: () => <SectionEventLoop /> },
  { id: "modules", icon: "📦", title: "Modules", color: "#3b82f6", render: () => <SectionModules /> },
  { id: "core", icon: "🔧", title: "Core Modules", color: "#06b6d4", render: () => <SectionCoreModules /> },
  { id: "killnotes", icon: "⚡", title: "Kill Notes", color: "#f59e0b", render: () => <KillNotes /> },
  { id: "cheatsheet", icon: "📋", title: "Cheatsheet", color: "#ec4899", render: () => <SuperCheatsheet /> },
  { id: "interview", icon: "🎤", title: "Interview Q&A", color: "#14b8a6", render: () => <InterviewSection /> },
];

const EXPRESS_SECTIONS = [
  { id: "what-express", icon: "🚂", title: "What is Express?", color: "#8b5cf6", render: () => <SectionWhatIsExpress /> },
  { id: "routing", icon: "🛣️", title: "Routing", color: "#3b82f6", render: () => <SectionRouting /> },
  { id: "middleware", icon: "🧩", title: "Middleware", color: "#f59e0b", render: () => <SectionMiddleware /> },
  { id: "errors", icon: "🛡️", title: "Error Handling", color: "#f43f5e", render: () => <SectionErrorHandling /> },
  { id: "auth", icon: "🔐", title: "Authentication", color: "#06b6d4", render: () => <SectionAuth /> },
  { id: "rest", icon: "🌐", title: "REST API Design", color: "#14b8a6", render: () => <SectionRestApi /> },
  { id: "killnotes", icon: "⚡", title: "Kill Notes", color: "#f59e0b", render: () => <ExpressKillNotes /> },
  { id: "interview", icon: "🎤", title: "Interview Q&A", color: "#ec4899", render: () => <ExpressInterview /> },
];

const DATABASE_SECTIONS = [
  { id: "what-db", icon: "🗄️", title: "What are Databases?", color: "#3b82f6", render: () => <SectionWhatIsDatabase /> },
  { id: "mongodb", icon: "🍃", title: "MongoDB & Mongoose", color: "#14b8a6", render: () => <SectionMongoDB /> },
  { id: "postgres", icon: "🐘", title: "PostgreSQL", color: "#3b82f6", render: () => <SectionPostgreSQL /> },
  { id: "prisma", icon: "🔷", title: "Prisma ORM", color: "#8b5cf6", render: () => <SectionPrisma /> },
  { id: "redis", icon: "🔴", title: "Redis", color: "#f43f5e", render: () => <SectionRedis /> },
  { id: "pooling", icon: "🏊", title: "Connection Pooling", color: "#06b6d4", render: () => <SectionConnectionPooling /> },
  { id: "killnotes", icon: "⚡", title: "Kill Notes", color: "#f59e0b", render: () => <DatabaseKillNotes /> },
  { id: "interview", icon: "🎤", title: "Interview Q&A", color: "#ec4899", render: () => <DatabaseInterview /> },
];

const TESTING_SECTIONS = [
  { id: "what-testing", icon: "🧪", title: "What is Testing?", color: "#f59e0b", render: () => <SectionWhatIsTesting /> },
  { id: "jest", icon: "🃏", title: "Jest", color: "#f43f5e", render: () => <SectionJest /> },
  { id: "supertest", icon: "🚀", title: "Supertest", color: "#3b82f6", render: () => <SectionSupertest /> },
  { id: "integration", icon: "🔗", title: "Integration Tests", color: "#8b5cf6", render: () => <SectionIntegration /> },
  { id: "debugging", icon: "🐛", title: "Debugging", color: "#06b6d4", render: () => <SectionDebugging /> },
  { id: "killnotes", icon: "⚡", title: "Kill Notes", color: "#f59e0b", render: () => <TestingKillNotes /> },
  { id: "interview", icon: "🎤", title: "Interview Q&A", color: "#14b8a6", render: () => <TestingInterview /> },
];

const DEVOPS_SECTIONS = [
  { id: "what-devops", icon: "🚀", title: "What is DevOps?", color: "#f43f5e", render: () => <SectionWhatIsDevOps /> },
  { id: "docker", icon: "🐳", title: "Docker", color: "#06b6d4", render: () => <SectionDocker /> },
  { id: "pm2", icon: "⚙️", title: "PM2", color: "#14b8a6", render: () => <SectionPM2 /> },
  { id: "nginx", icon: "🌐", title: "Nginx", color: "#3b82f6", render: () => <SectionNginx /> },
  { id: "cicd", icon: "🔄", title: "CI/CD", color: "#8b5cf6", render: () => <SectionCICD /> },
  { id: "monitoring", icon: "📊", title: "Monitoring", color: "#f59e0b", render: () => <SectionMonitoring /> },
  { id: "killnotes", icon: "⚡", title: "Kill Notes", color: "#f43f5e", render: () => <DevOpsKillNotes /> },
  { id: "interview", icon: "🎤", title: "Interview Q&A", color: "#ec4899", render: () => <DevOpsInterview /> },
];

const TYPESCRIPT_SECTIONS = [
  { id: "what-ts", icon: "🔷", title: "What is TypeScript?", color: "#3b82f6", render: () => <SectionWhatIsTypeScript /> },
  { id: "types", icon: "📦", title: "Types & Inference", color: "#3b82f6", render: () => <SectionTypes /> },
  { id: "interfaces", icon: "📐", title: "Interfaces", color: "#14b8a6", render: () => <SectionInterfaces /> },
  { id: "generics", icon: "⚙️", title: "Generics", color: "#8b5cf6", render: () => <SectionGenerics /> },
  { id: "tsconfig", icon: "⚙️", title: "tsconfig.json", color: "#f59e0b", render: () => <SectionTsConfig /> },
  { id: "type-safe-api", icon: "🌐", title: "Type-Safe APIs", color: "#06b6d4", render: () => <SectionTypeSafeApi /> },
  { id: "killnotes", icon: "⚡", title: "Kill Notes", color: "#f59e0b", render: () => <TypeScriptKillNotes /> },
  { id: "interview", icon: "🎤", title: "Interview Q&A", color: "#ec4899", render: () => <TypeScriptInterview /> },
];

const LEARNING_MODULES = [
  {
    id: "node-phase1",
    title: "Node.js Core Fundamentals",
    subtitle: "Phase 1 · Deep Dive",
    description: "Runtime, Event Loop, Modules, Core APIs, Cheatsheets & Interview Prep",
    icon: "🟢",
    color: D.green,
    lessons: 7,
    status: "active",
    sections: NODE_SECTIONS,
  },
  {
    id: "express",
    title: "Express.js & Middleware",
    subtitle: "Phase 2 · Deep Dive",
    description: "Routing, middleware pattern, error handling, authentication, REST API design",
    icon: "🚂",
    color: "#8b5cf6",
    lessons: 8,
    status: "active",
    sections: EXPRESS_SECTIONS,
  },
  {
    id: "database",
    title: "Databases & ORMs",
    subtitle: "Phase 3 · Deep Dive",
    description: "MongoDB, PostgreSQL, Redis, Prisma, Mongoose, connection pooling",
    icon: "🗄️",
    color: "#3b82f6",
    lessons: 8,
    status: "active",
    sections: DATABASE_SECTIONS,
  },
  {
    id: "testing",
    title: "Testing & Debugging",
    subtitle: "Phase 4 · Deep Dive",
    description: "Jest, Mocha, Supertest, integration tests, debugging with ndb",
    icon: "🧪",
    color: "#f59e0b",
    lessons: 7,
    status: "active",
    sections: TESTING_SECTIONS,
  },
  {
    id: "deployment",
    title: "Deployment & DevOps",
    subtitle: "Phase 5 · Deep Dive",
    description: "Docker, PM2, nginx, CI/CD, environment management, monitoring",
    icon: "🚀",
    color: "#f43f5e",
    lessons: 8,
    status: "active",
    sections: DEVOPS_SECTIONS,
  },
  {
    id: "typescript",
    title: "TypeScript with Node",
    subtitle: "Phase 6 · Deep Dive",
    description: "Type safety, interfaces, generics, tsconfig, type-safe APIs with Zod",
    icon: "🔷",
    color: "#06b6d4",
    lessons: 8,
    status: "active",
    sections: TYPESCRIPT_SECTIONS,
  },
];

export function ModuleView({ module, onBack }) {
  if (module.isChatBot) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#ffffff" }}>
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0", background: "#ffffff" }}>
          <button onClick={onBack} style={{ padding: "5px 12px", background: "transparent", border: "1px solid #e2e8f0", borderRadius: 5, color: "#64748b", cursor: "pointer", fontSize: 11, fontFamily: "'Inter', monospace" }}>← Back to Dashboard</button>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <ChartBot />
        </div>
      </div>
    );
  }

  const [active, setActive] = useState(module.sections[0]?.id || "");
  const current = module.sections.find(s => s.id === active) || module.sections[0];
  const idx = module.sections.findIndex(s => s.id === active);

  if (!current) return null;

  return (
    <div style={{ minHeight: "100vh", background: D.bg, fontFamily: display, color: D.text, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "13px 20px 9px", borderBottom: `1px solid ${D.outline}`, background: D.surfaceLowest }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onBack} style={{ padding: "5px 12px", background: "transparent", border: `1px solid ${D.outline}`, borderRadius: 5, color: D.muted, cursor: "pointer", fontSize: 11, fontFamily: mono }}>← Dashboard</button>
          <div style={{ width: 1, height: 20, background: D.outline }} />
          <div>
            <div style={{ fontSize: 10, letterSpacing: 4, color: D.muted, textTransform: "uppercase", marginBottom: 3, fontFamily: mono }}>{module.subtitle}</div>
            <h1 style={{ margin: 0, fontSize: "clamp(13px,2.4vw,19px)", fontFamily: display, fontWeight: 800, color: D.text }}>
              {module.title} — <span style={{ color: current.color, transition: "color 0.3s" }}>{current.title}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, minHeight: 0, flexWrap: "wrap" }}>
        {/* Sidebar */}
        <div style={{ width: "clamp(115px,15vw,195px)", background: D.surfaceLowest, borderRight: `1px solid ${D.outline}`, padding: "8px 0", overflowY: "auto" }}>
          {module.sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              style={{ display: "flex", alignItems: "center", gap: 7, width: "100%", padding: "9px 12px", background: active === s.id ? s.color + "0d" : "transparent", border: "none", borderLeft: active === s.id ? `3px solid ${s.color}` : "3px solid transparent", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
              <span style={{ fontSize: 12 }}>{s.icon}</span>
              <span style={{ fontSize: 11, fontWeight: active === s.id ? 700 : 400, color: active === s.id ? s.color : D.muted, fontFamily: mono }}>{s.title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "clamp(12px,3vw,24px)", minWidth: 260 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16, paddingBottom: 10, borderBottom: `1px solid ${current.color}22` }}>
            <span style={{ fontSize: 20 }}>{current.icon}</span>
            <h2 style={{ margin: 0, fontSize: "clamp(14px,2.2vw,20px)", fontFamily: display, color: current.color, fontWeight: 800 }}>{current.title}</h2>
          </div>
          {current.render()}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 8 }}>
            {idx > 0 && <button onClick={() => setActive(module.sections[idx-1].id)} style={{ padding: "7px 14px", background: "transparent", border: `1px solid ${D.outline}`, borderRadius: 5, color: D.muted, cursor: "pointer", fontSize: 11, fontFamily: mono }}>← {module.sections[idx-1].title}</button>}
            <div style={{ flex: 1 }} />
            {idx < module.sections.length-1 && <button onClick={() => setActive(module.sections[idx+1].id)} style={{ padding: "7px 14px", background: "transparent", border: `1px solid ${current.color}`, borderRadius: 5, color: current.color, cursor: "pointer", fontSize: 11, fontFamily: mono }}>{module.sections[idx+1].title} →</button>}
          </div>
        </div>
      </div>

      {/* Footer nav */}
      <div style={{ padding: "7px 14px", borderTop: `1px solid ${D.outline}`, background: D.surfaceLowest, display: "flex", gap: 4, flexWrap: "wrap" }}>
        {module.sections.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)}
            style={{ padding: "3px 8px", fontSize: 10, background: active === s.id ? s.color : "transparent", color: active === s.id ? "#fff" : D.muted, border: `1px solid ${active === s.id ? s.color : D.outline}`, borderRadius: 3, cursor: "pointer", fontWeight: active === s.id ? 900 : 400, fontFamily: mono }}>
            {s.icon} {s.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ onSelectModule }) {
  return (
    <div style={{ minHeight: "100vh", background: D.bg, fontFamily: display, color: D.text }}>
      {/* Header */}
      <div style={{ padding: "20px 28px", borderBottom: `1px solid ${D.outline}`, background: D.surfaceLowest }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: D.greenBg, border: `1px solid ${D.green}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎓</div>
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(16px,2.8vw,24px)", fontFamily: display, fontWeight: 800, color: D.text }}>LearnerModel</h1>
            <p style={{ margin: 0, fontSize: 11, color: D.muted, fontFamily: mono }}>Full-Stack Learning Dashboard</p>
          </div>
        </div>
        <p style={{ margin: "8px 0 0", fontSize: 13, color: D.muted, fontFamily: serif, maxWidth: 600, lineHeight: 1.7 }}>
          A structured learning path from zero to production. Each module is built with interactive demos, quizzes, real code examples, and interview prep.
        </p>
      </div>

      {/* Stats bar */}
      <div style={{ display: "flex", gap: 16, padding: "16px 28px", background: D.surface, borderBottom: `1px solid ${D.outline}`, flexWrap: "wrap" }}>
        {[
          { label: "Active Modules", value: "6", color: D.green },
          { label: "Total Lessons", value: "52", color: "#3b82f6" },
          { label: "Quizzes", value: "80+", color: "#f59e0b" },
          { label: "Live Demos", value: "12", color: "#ec4899" },
          { label: "Interview Qs", value: "50+", color: "#14b8a6" },
        ].map(stat => (
          <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: D.surfaceLowest, borderRadius: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: stat.color, fontFamily: mono }}>{stat.value}</span>
            <span style={{ fontSize: 10, color: D.muted, fontFamily: mono, textTransform: "uppercase", letterSpacing: 1 }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Module Grid */}
      <div style={{ padding: "24px 28px" }}>
        <h2 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: D.text, fontFamily: display }}>Learning Modules</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {LEARNING_MODULES.map(mod => (
            <button
              key={mod.id}
              onClick={() => mod.status === "active" && onSelectModule(mod)}
              disabled={mod.status !== "active"}
              style={{
                padding: "20px",
                background: mod.status === "active" ? D.surfaceLowest : D.surface,
                border: `1px solid ${mod.status === "active" ? mod.color + "55" : D.outline}`,
                borderRadius: 10,
                cursor: mod.status === "active" ? "pointer" : "default",
                textAlign: "left",
                transition: "all 0.15s ease",
                opacity: mod.status === "active" ? 1 : 0.6,
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                if (mod.status === "active") e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>{mod.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: mod.status === "active" ? mod.color : D.muted, fontFamily: mono }}>{mod.title}</div>
                  <div style={{ fontSize: 10, color: D.muted, fontFamily: mono, marginTop: 2 }}>{mod.subtitle}</div>
                </div>
                {mod.status === "coming" && (
                  <span style={{ fontSize: 9, padding: "2px 8px", background: D.outline + "44", color: D.muted, borderRadius: 3, fontFamily: mono }}>SOON</span>
                )}
                {mod.status === "active" && (
                  <span style={{ fontSize: 9, padding: "2px 8px", background: mod.color + "22", color: mod.color, borderRadius: 3, fontFamily: mono }}>OPEN</span>
                )}
              </div>
              <p style={{ margin: "0 0 12px", fontSize: 12, color: D.muted, fontFamily: serif, lineHeight: 1.7 }}>{mod.description}</p>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {mod.lessons > 0 && (
                  <span style={{ fontSize: 10, color: D.muted, fontFamily: mono }}>{mod.lessons} lessons</span>
                )}
                {mod.status === "active" && (
                  <span style={{ marginLeft: "auto", fontSize: 11, color: mod.color, fontWeight: 700, fontFamily: mono }}>Start Learning →</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
