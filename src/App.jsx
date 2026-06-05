import { useState } from "react";
import "./App.css";
import ChartBot from "./ChartBot";
import Dashboard, { ModuleView } from "./components/Dashboard";

export default function App() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [chatBotOpen, setChatBotOpen] = useState(false);

  return (
    <>
      {selectedModule
        ? <ModuleView module={selectedModule} onBack={() => setSelectedModule(null)} />
        : <Dashboard onSelectModule={setSelectedModule} />
      }

      {/* Floating Chat Bot Button */}
      <button
        onClick={() => setChatBotOpen(true)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
          border: "none",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          zIndex: 999,
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.1)";
          e.target.style.boxShadow = "0 6px 16px rgba(37, 99, 235, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.4)";
        }}
        title="Open Chart Bot"
      >
        🤖
      </button>

      {/* Chat Bot Side Panel */}
      {chatBotOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setChatBotOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.3)",
              zIndex: 1000,
              animation: "fadeIn 0.2s ease",
            }}
          />
          {/* Side Panel */}
          <div
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              bottom: 0,
              width: "420px",
              background: "#ffffff",
              boxShadow: "-2px 0 12px rgba(0, 0, 0, 0.15)",
              display: "flex",
              flexDirection: "column",
              zIndex: 1001,
              animation: "slideInRight 0.3s ease",
            }}
          >
            {/* Header */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #e2e8f0", background: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>🤖 Chart Bot</span>
              <button
                onClick={() => setChatBotOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: 18,
                  cursor: "pointer",
                  color: "#64748b",
                  padding: "4px 8px"
                }}
              >
                ✕
              </button>
            </div>
            {/* Chat Content */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <ChartBot />
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideInRight {
              from { transform: translateX(100%); }
              to { transform: translateX(0); }
            }
          `}</style>
        </>
      )}
    </>
  );
}
