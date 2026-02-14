import React from "react";
import ReactDOM from "react-dom/client";
import { famousAppScenarios } from "@packages/navigation-scenarios";

function App() {
  return (
    <main style={{ maxWidth: 600, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1>유명 앱 내비게이션 재현 카탈로그</h1>
      {famousAppScenarios.map((scenario) => (
        <section key={scenario.app} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
          <h2>{scenario.app}</h2>
          <p>{scenario.pattern}</p>
          <ul>
            {scenario.flows.map((flow) => (
              <li key={flow}>{flow}</li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
