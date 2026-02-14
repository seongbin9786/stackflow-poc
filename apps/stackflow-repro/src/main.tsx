import React from "react";
import ReactDOM from "react-dom/client";
import { stackflow, useFlow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { coreNavigationPatterns } from "@packages/navigation-scenarios";
import "./styles.css";

function Home() {
  const flow = useFlow();
  return (
    <section>
      <h2>Home</h2>
      <p>모바일 기준(max-width:600px) 화면에서 Stackflow push/pop 동작을 검증합니다.</p>
      <button onClick={() => flow.push("List", {})}>List로 push</button>
      <button onClick={() => flow.push("Modal", { from: "home" })}>Modal 스타일 Activity</button>
    </section>
  );
}

function List() {
  const flow = useFlow();
  return (
    <section>
      <h2>List</h2>
      <button onClick={() => flow.push("Detail", { id: String(Date.now()) })}>Detail push</button>
      <button onClick={() => flow.pop()}>pop</button>
    </section>
  );
}

function Detail({ params }: { params: { id: string } }) {
  const flow = useFlow();
  return (
    <section>
      <h2>Detail #{params.id}</h2>
      <ol>
        <li>데스크톱 폭(600px 초과)에서 List → Detail push</li>
        <li>브라우저 새로고침</li>
        <li>브라우저 뒤로가기 및 flow.pop 비교</li>
      </ol>
      <button onClick={() => flow.pop()}>flow.pop</button>
      <button onClick={() => history.back()}>window.history.back</button>
    </section>
  );
}

function Modal({ params }: { params: { from: string } }) {
  const flow = useFlow();
  return (
    <section>
      <h2>Modal Activity</h2>
      <p>from: {params.from}</p>
      <button onClick={() => flow.pop()}>닫기(pop)</button>
    </section>
  );
}

const { Stack } = stackflow({
  activities: { Home, List, Detail, Modal },
  transitionDuration: 180,
  plugins: [
    basicRendererPlugin(),
    historySyncPlugin({
      routes: {
        Home: "/",
        List: "/list",
        Detail: "/detail/:id",
        Modal: "/modal/:from"
      }
    })
  ]
});

function DeviceGuard() {
  const isMobileWidth = window.matchMedia("(max-width: 600px)").matches;
  return (
    <div className="frame">
      <header>
        <h1>Stackflow Router 검증용 Example</h1>
        <p>현재 폭 상태: {isMobileWidth ? "모바일(<=600)" : "데스크톱(>600)"}</p>
      </header>
      <aside>
        <h3>검증 포인트</h3>
        <ul>
          {coreNavigationPatterns.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>
      <Stack initialActivity="Home" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DeviceGuard />
  </React.StrictMode>
);
