@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap");

:root {
  --paper: #f7f8f5;
  --panel: #ffffff;
  --ink: #191d18;
  --muted: #687266;
  --line: #e7ece3;
  --sidebar: #121611;
  --lime: #d5f365;
  --lime-deep: #99af3a;
  --shadow: rgba(18, 20, 17, 0.08);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: "DM Sans", sans-serif;
}
button, input, textarea { font: inherit; }
button { cursor: pointer; }

.app-shell {
  min-height: 100vh;
  display: flex;
}

.sidebar {
  width: 250px;
  background: var(--sidebar);
  color: white;
  padding: 24px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Manrope", sans-serif;
  font-weight: 800;
  letter-spacing: -0.08em;
  font-size: 24px;
  margin-bottom: 10px;
  padding: 4px 8px;
}

.brand-mark {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: var(--lime);
  color: black;
  display: grid;
  place-items: center;
  font-size: 16px;
}

.brand-name span {
  color: #afb5aa;
  font-weight: 500;
}

.new-project {
  border: 0;
  border-radius: 8px;
  background: var(--lime);
  color: black;
  padding: 12px 14px;
  text-align: left;
  font-weight: 700;
  margin: 12px 0 18px;
}

.sidebar-section {
  padding: 0 8px 10px;
  color: #90988d;
  font-size: 9px;
  letter-spacing: 0.16em;
  font-weight: 700;
}

.project-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.count-pill {
  background: rgba(255,255,255,0.08);
  border-radius: 999px;
  padding: 4px 6px;
  color: #dfe6d4;
}

.nav-item {
  width: 100%;
  background: transparent;
  border: 0;
  color: #d7ded3;
  text-align: left;
  padding: 11px 10px;
  border-radius: 8px;
  font-weight: 500;
}

.nav-item.active {
  background: rgba(255,255,255,0.08);
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 120px;
}

.project-item {
  border: 0;
  text-align: left;
  background: transparent;
  color: #d7ded3;
  border-radius: 8px;
  padding: 10px 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.project-item.selected {
  background: rgba(255,255,255,0.08);
}

.sidebar-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.free-card {
  display: flex;
  gap: 10px;
  align-items: center;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  border-radius: 10px;
  padding: 12px 10px;
}

.mini-icon {
  color: var(--lime);
  font-size: 18px;
}

.free-card strong,
.free-card span {
  display: block;
}

.free-card strong {
  font-size: 11px;
}

.free-card span {
  margin-top: 5px;
  color: #b2b9b0;
  font-size: 10px;
}

.help-link {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 15px;
}

.main-area {
  flex: 1;
  min-width: 0;
}

.topbar {
  background: rgba(255,255,255,0.9);
  border-bottom: 1px solid var(--line);
  height: 62px;
  padding: 0 26px 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobile-menu {
  display: none;
  background: transparent;
  border: 0;
  font-size: 24px;
}

.crumbs {
  color: #7f877d;
  font-size: 12px;
}

.crumbs span { margin: 0 6px; }
.crumbs strong { color: var(--ink); }

.top-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.status-dot {
  color: #7a847a;
  font-size: 11px;
}

.publish-button {
  background: var(--ink);
  color: white;
  border: 0;
  border-radius: 8px;
  padding: 9px 13px;
  font-weight: 700;
}

.workspace {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 26px 50px;
}

.hero-header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 22px;
}

.eyebrow {
  color: #7f877e;
  letter-spacing: 0.15em;
  font-size: 9px;
  font-weight: 700;
}

.hero-header h1 {
  margin: 8px 0 0;
  font-family: "Manrope", sans-serif;
  font-weight: 800;
  font-size: clamp(2.4rem, 4vw, 4rem);
  letter-spacing: -0.08em;
}

.step-pill {
  border: 1px solid var(--line);
  background: white;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 11px;
  color: #667166;
}

.prompt-panel {
  background: white;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 18px 18px 14px;
  box-shadow: 0 8px 30px var(--shadow);
}

.panel-topline {
  display: flex;
  align-items: center;
  gap: 12px;
}

.spark {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  background: #edf5d9;
  color: var(--lime-deep);
  border-radius: 10px;
}

.panel-topline h2 {
  margin: 0 0 4px;
  font-size: 16px;
}

.panel-topline p {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
}

.pill {
  margin-left: auto;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  padding: 7px 9px;
  color: #7a8a6d;
}

.prompt-panel textarea {
  width: 100%;
  border: 1px solid var(--line);
  background: #fafcf8;
  border-radius: 10px;
  min-height: 84px;
  margin-top: 16px;
  padding: 12px 14px;
  resize: vertical;
  color: var(--ink);
}

.prompt-actions {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.hint {
  color: #8a928b;
  font-size: 11px;
}

.submit-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #8a928b;
  font-size: 11px;
}

.generate-button {
  border: 0;
  background: var(--ink);
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: 700;
}

.sample-row {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--line);
}

.sample-pill {
  background: white;
  border: 1px solid var(--line);
  color: #596258;
  border-radius: 999px;
  padding: 7px 10px;
}

.canvas-topbar {
  margin-top: 30px;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 12px;
}

.small-label {
  font-size: 9px;
  letter-spacing: 0.15em;
  color: #7e877d;
  font-weight: 700;
}

.canvas-topbar h3 {
  margin: 7px 0 0;
  font-size: 28px;
  font-family: "Manrope", sans-serif;
  letter-spacing: -0.04em;
}

.canvas-tools {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tool-button,
.export-button,
.mini-open {
  border: 1px solid var(--line);
  background: white;
  border-radius: 8px;
  color: var(--ink);
  height: 36px;
  min-width: 36px;
}

.export-button {
  padding: 0 12px;
  font-weight: 700;
}

.canvas-layout {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 18px;
}

.editor-panel {
  background: white;
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.panel-header {
  font-weight: 700;
  margin-bottom: 15px;
}

.editor-panel label {
  font-size: 9px;
  letter-spacing: 0.12em;
  color: #7d867c;
  font-weight: 700;
  margin-bottom: 8px;
}

.editor-panel input,
.editor-panel textarea {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 9px 10px;
  margin-bottom: 14px;
  background: #fcfdfb;
}

.editor-panel textarea {
  resize: vertical;
}

.color-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}

.color-box {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #5d665f;
  font-size: 11px;
}

.color-box input {
  width: 26px;
  height: 26px;
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
}

.apply-button,
.modal-button {
  border: 0;
  border-radius: 8px;
  background: var(--ink);
  color: white;
  padding: 11px 10px;
  font-weight: 700;
}

.preview-panel {
  background: white;
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.browser-toolbar {
  height: 42px;
  background: #fafcf9;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
}

.dots {
  display: flex;
  align-items: center;
  gap: 7px;
}

.dot {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.red { background: #f0b3a7; }
.yellow { background: #efd99d; }
.green { background: #b7d9a5; }

.browser-url {
  flex: 1;
  text-align: center;
  color: #7f877d;
  font-size: 10px;
  background: #f0f3ee;
  border-radius: 7px;
  padding: 7px 8px;
}

.mini-open {
  font-size: 14px;
  min-width: 34px;
}

.preview-frame {
  min-height: 500px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  background: #f5f7f3;
}

.preview-frame iframe {
  width: 100%;
  border: 0;
  min-height: 500px;
  background: white;
}

.preview-frame.mobile {
  padding: 18px;
  background: #eef1ed;
}

.preview-frame.mobile iframe {
  max-width: 390px;
  min-height: 560px;
  border-radius: 28px;
  border: 5px solid #1b201a;
  box-shadow: 0 15px 24px rgba(0,0,0,0.08);
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  background: var(--ink);
  color: white;
  padding: 10px 14px;
  border-radius: 10px;
  box-shadow: 0 18px 30px rgba(0,0,0,0.18);
  font-size: 12px;
  z-index: 30;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(17,20,18,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 20;
}

.modal-card {
  position: relative;
  width: min(440px, 100%);
  background: white;
  border-radius: 16px;
  padding: 26px 24px 22px;
  border: 1px solid var(--line);
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  background: #f2f4ef;
  border: 0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.modal-kicker {
  color: #7e9b35;
  font-size: 9px;
  letter-spacing: 0.14em;
  font-weight: 700;
}

.modal-card h4 {
  font-family: "Manrope", sans-serif;
  font-size: 30px;
  margin: 10px 0 8px;
  letter-spacing: -0.06em;
}

.modal-card p {
  color: var(--muted);
  line-height: 1.6;
  margin: 0 0 18px;
}

.steps {
  display: grid;
  gap: 10px;
  padding: 12px 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #fafcf9;
  margin-bottom: 18px;
}

.steps div {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.steps span {
  display: inline-grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #edf5d9;
  color: #708a2f;
  font-size: 10px;
  font-weight: 700;
}

.help-list {
  margin: 0;
  padding-left: 20px;
  color: var(--muted);
  line-height: 1.8;
}

@media (max-width: 900px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 10;
    transform: translateX(-100%);
    transition: transform 0.2s ease;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .mobile-menu {
    display: block;
  }

  .main-area {
    width: 100%;
  }

  .canvas-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .workspace {
    padding: 24px 16px 36px;
  }

  .hero-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .panel-topline {
    align-items: flex-start;
  }

  .pill {
    display: none;
  }

  .prompt-actions {
    align-items: flex-start;
    flex-direction: column;
  }

  .canvas-topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .tool-button,
  .export-button {
    min-width: 40px;
  }
}
