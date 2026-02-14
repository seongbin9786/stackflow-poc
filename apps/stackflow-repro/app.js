const stackView = document.getElementById('stackView');
const logBox = document.getElementById('log');
const syncHistoryCheckbox = document.getElementById('syncHistory');
const simulateIssueCheckbox = document.getElementById('simulateDesktopRefreshIssue');
const viewportState = document.getElementById('viewportState');

let stack = [{ key: 'home', title: 'Home', ts: Date.now() }];

const stateKey = 'stackflow-repro-stack';
const issueKey = 'stackflow-repro-issue';

function isDesktop() {
  return window.matchMedia('(min-width: 601px)').matches;
}

function updateViewportState() {
  viewportState.textContent = isDesktop() ? 'Desktop (>600)' : 'Mobile (<=600)';
}

function writeLog(msg) {
  const now = new Date().toLocaleTimeString();
  logBox.textContent = `[${now}] ${msg}\n` + logBox.textContent;
}

function render() {
  stackView.innerHTML = `<h3>현재 Stack (${stack.length})</h3>` + stack
    .map((s, i) => `<div class="stack-item">${i + 1}. ${s.title} (${s.key})</div>`)
    .join('');
}

function persist() {
  sessionStorage.setItem(stateKey, JSON.stringify(stack));
}

function routeForKey(key, ts) {
  if (key === 'home') return '/';
  if (key === 'list') return '/list';
  if (key === 'detail') return `/detail/${ts}`;
  return '/modal';
}

function push(key) {
  const titleMap = { home: 'Home', list: 'List', detail: 'Detail', modal: 'Modal' };
  const screen = { key, title: titleMap[key], ts: Date.now() };
  stack.push(screen);
  persist();
  render();

  if (syncHistoryCheckbox.checked) {
    history.pushState({ type: 'push', stackDepth: stack.length }, '', routeForKey(key, screen.ts));
  }
  writeLog(`push(${key}) -> depth=${stack.length}`);
}

function pop(source) {
  if (stack.length <= 1) {
    writeLog(`${source}: 더 이상 pop 불가(루트)`);
    return;
  }
  const popped = stack.pop();
  persist();
  render();
  writeLog(`${source}: pop(${popped.key}) -> depth=${stack.length}`);
}

function boot() {
  updateViewportState();
  window.addEventListener('resize', updateViewportState);

  const saved = sessionStorage.getItem(stateKey);
  if (saved) {
    try {
      stack = JSON.parse(saved);
      writeLog('refresh 복원: sessionStorage stack 복원 완료');
    } catch {
      writeLog('refresh 복원 실패: 저장 stack 파싱 오류');
    }
  }

  const issueFlag = sessionStorage.getItem(issueKey) === '1';
  simulateIssueCheckbox.checked = issueFlag;

  if (issueFlag && isDesktop()) {
    writeLog('PC 새로고침 이슈 시뮬레이션 활성: 브라우저 back 동작 무시');
    window.addEventListener('popstate', (e) => {
      e.preventDefault?.();
      history.pushState({ blocked: true }, '', location.pathname);
      writeLog('시뮬레이션: popstate 차단됨(문제 재현)');
    });
  } else {
    window.addEventListener('popstate', () => {
      pop('popstate');
    });
  }

  render();
}

for (const btn of document.querySelectorAll('[data-push]')) {
  btn.addEventListener('click', () => push(btn.dataset.push));
}

document.getElementById('popBtn').addEventListener('click', () => pop('flow.pop'));
document.getElementById('backBtn').addEventListener('click', () => history.back());
syncHistoryCheckbox.addEventListener('change', () => writeLog(`historySync=${syncHistoryCheckbox.checked}`));
simulateIssueCheckbox.addEventListener('change', () => {
  sessionStorage.setItem(issueKey, simulateIssueCheckbox.checked ? '1' : '0');
  writeLog(`이슈 시뮬레이션=${simulateIssueCheckbox.checked} (새로고침 시 반영)`);
});

boot();
