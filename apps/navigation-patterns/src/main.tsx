import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Navigation Patterns Playground</h1>
      <ul>
        <li><Link to="/tabs/feed">Tabs + Nested stack</Link></li>
        <li><Link to="/wizard/step-1">Wizard</Link></li>
        <li><Link to="/modal">Modal route</Link></li>
      </ul>
    </div>
  );
}

function Wizard({ step }: { step: number }) {
  const nav = useNavigate();
  return (
    <div>
      <h2>Wizard step {step}</h2>
      {step > 1 && <button onClick={() => nav(`/wizard/step-${step - 1}`)}>Prev</button>}
      {step < 3 && <button onClick={() => nav(`/wizard/step-${step + 1}`)}>Next</button>}
      {step === 3 && <button onClick={() => nav("/")}>Done</button>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tabs/feed" element={<div><h2>Feed Tab</h2><Link to="/tabs/feed/post/42">Post 42</Link></div>} />
      <Route path="/tabs/feed/post/:id" element={<div><h2>Post Detail</h2><Link to="/tabs/feed">Back to feed tab</Link></div>} />
      <Route path="/wizard/step-1" element={<Wizard step={1} />} />
      <Route path="/wizard/step-2" element={<Wizard step={2} />} />
      <Route path="/wizard/step-3" element={<Wizard step={3} />} />
      <Route path="/modal" element={<div><h2>Fullscreen modal route</h2><Link to="/">Close</Link></div>} />
    </Routes>
  </BrowserRouter>
);
