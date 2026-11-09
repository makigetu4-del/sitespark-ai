"use client";

import { useEffect, useMemo, useState } from "react";
import { buildGeneratedHtml, generateFallbackSite, type SiteData } from "@/lib/site-generator";

const initialSite: SiteData = {
  id: "northstar-coffee",
  name: "Northstar Coffee",
  headline: "Find your little corner of calm.",
  description:
    "Good coffee, warm people, and a little room to breathe. We roast in small batches and pour every cup with care, right here in the neighborhood.",
  cta: "Find your coffee",
  color: "#d5f365",
  prompt: "A warm, modern website for my neighborhood coffee shop. Include our menu, story, opening hours, and a way to find us.",
};

const samplePrompts = [
  "A cheerful flower shop with a seasonal bouquet menu, our story, and a contact section",
  "A bold portfolio for a freelance photographer showcasing selected work, a short bio, and booking details",
  "A friendly local yoga studio with class schedules, teacher introductions, and a free trial offer",
];

export default function HomePage() {
  const [prompt, setPrompt] = useState(initialSite.prompt);
  const [site, setSite] = useState<SiteData>(initialSite);
  const [projects, setProjects] = useState<SiteData[]>([]);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState("");
  const [showPublish, setShowPublish] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sitespark-projects");
      if (!raw) {
        setProjects([initialSite]);
        return;
      }
      const parsed = JSON.parse(raw) as SiteData[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setProjects(parsed);
        setSite(parsed[0]);
        setPrompt(parsed[0].prompt || prompt);
      } else {
        setProjects([initialSite]);
      }
    } catch {
      setProjects([initialSite]);
    }
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("sitespark-projects", JSON.stringify(projects));
    }
  }, [projects]);

  const previewHtml = useMemo(() => buildGeneratedHtml(site), [site]);

  const showToast = (message: string) => {
    setToast(message);
    window.clearTimeout((window as any).__sitesparkToastTimer);
    (window as any).__sitesparkToastTimer = window.setTimeout(() => setToast(""), 2600);
  };

  const saveProject = (next: SiteData) => {
    const item = { ...next, id: next.id || next.name.toLowerCase().replace(/\s+/g, "-") };
    setProjects((current) => {
      const existingIndex = current.findIndex((project) => project.id === item.id);
      if (existingIndex >= 0) {
        const copy = [...current];
        copy[existingIndex] = item;
        return copy;
      }
      return [item, ...current].slice(0, 8);
    });
  };

  const handleGenerate = async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) {
      showToast("Describe your idea first.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmedPrompt }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to generate website");
      const generated = {
        ...generateFallbackSite(trimmedPrompt),
        ...data,
        prompt: trimmedPrompt,
      } as SiteData;
      setSite(generated);
      saveProject(generated);
      showToast("Website draft created.");
    } catch (error) {
      const fallback = generateFallbackSite(trimmedPrompt);
      setSite(fallback);
      saveProject(fallback);
      showToast("Fallback draft created.");
    } finally {
      setIsGenerating(false);
    }
  };

  const applyEdits = () => {
    const nextSite: SiteData = {
      ...site,
      name: site.name.trim() || "My New Website",
      headline: site.headline.trim() || "A good idea deserves a good beginning.",
      description:
        site.description.trim() ||
        "Thoughtful work, a friendly approach, and a little spark in everything we do.",
      cta: site.cta.trim() || "Get in touch",
      color: site.color || "#d5f365",
      prompt: prompt.trim() || site.prompt,
    };
    setSite(nextSite);
    saveProject(nextSite);
    showToast("Updates saved.");
  };

  const exportHtml = () => {
    const blob = new Blob([buildGeneratedHtml(site)], { type: "text/html;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${site.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "site"}.html`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
    showToast("Website downloaded.");
  };

  const openPreview = () => {
    const newWindow = window.open("", "_blank");
    if (!newWindow) {
      showToast("Allow pop-ups to open the preview.");
      return;
    }
    newWindow.document.write(buildGeneratedHtml(site));
    newWindow.document.close();
  };

  const loadProject = (project: SiteData) => {
    setSite(project);
    setPrompt(project.prompt || prompt);
    setSidebarOpen(false);
  };

  return (
    <main className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="brand-wrap">
          <div className="brand-mark">✦</div>
          <div className="brand-name">site<span>spark</span></div>
        </div>

        <button className="new-project" onClick={() => setPrompt("")}>
          + New website
        </button>

        <div className="sidebar-section">WORKSPACE</div>
        <button className="nav-item active">Website builder</button>

        <div className="sidebar-section project-head">
          <span>YOUR PROJECTS</span>
          <span className="count-pill">{projects.length}</span>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <button
              key={project.id}
              className={`project-item ${site.id === project.id ? "selected" : ""}`}
              onClick={() => loadProject(project)}
            >
              {project.name}
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="free-card">
            <div className="mini-icon">✦</div>
            <div>
              <strong>Free to start</strong>
              <span>Deploy on GitHub Pages</span>
            </div>
          </div>

          <button className="nav-item help-link" onClick={() => setShowHelp(true)}>
            How it works
          </button>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setSidebarOpen((value) => !value)}>
            ☰
          </button>
          <div className="crumbs">
            Workspace <span>/</span> <strong>{site.name}</strong>
          </div>
          <div className="top-actions">
            <span className="status-dot">● Saved</span>
            <button className="publish-button" onClick={() => setShowPublish(true)}>
              Publish
            </button>
          </div>
        </header>

        <div className="workspace">
          <div className="hero-header">
            <div>
              <div className="eyebrow">YOUR CREATIVE STUDIO</div>
              <h1>Make it real.</h1>
            </div>
            <div className="step-pill">01 Build your website</div>
          </div>

          <div className="prompt-panel">
            <div className="panel-topline">
              <div className="spark">✦</div>
              <div>
                <h2>What are we making today?</h2>
                <p>Describe the kind of site you want. The first draft is generated instantly.</p>
              </div>
              <div className="pill">AI READY</div>
            </div>

            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              maxLength={600}
              placeholder="A warm, modern site for my neighborhood coffee shop with story, hours, menu, and map details..."
            />

            <div className="prompt-actions">
              <div className="hint">Start with a business, creator, or landing page idea</div>
              <div className="submit-wrap">
                <span>{prompt.length}/600</span>
                <button className="generate-button" onClick={handleGenerate} disabled={isGenerating}>
                  {isGenerating ? "Creating..." : "Generate website"}
                </button>
              </div>
            </div>

            <div className="sample-row">
              {samplePrompts.map((sample) => (
                <button key={sample} className="sample-pill" onClick={() => setPrompt(sample)}>
                  {sample.slice(0, 18)}...
                </button>
              ))}
            </div>
          </div>

          <div className="canvas-topbar">
            <div>
              <div className="small-label">THE CANVAS</div>
              <h3>Website preview</h3>
            </div>
            <div className="canvas-tools">
              <button className="tool-button" onClick={() => setDevice("desktop")}>▭</button>
              <button className="tool-button" onClick={() => setDevice("mobile")}>▯</button>
              <button className="export-button" onClick={exportHtml}>Export HTML</button>
            </div>
          </div>

          <div className="canvas-layout">
            <aside className="editor-panel">
              <div className="panel-header">Quick edits</div>

              <label>WEBSITE NAME</label>
              <input
                value={site.name}
                onChange={(event) => setSite((current) => ({ ...current, name: event.target.value }))}
              />

              <label>HEADLINE</label>
              <textarea
                rows={3}
                value={site.headline}
                onChange={(event) => setSite((current) => ({ ...current, headline: event.target.value }))}
              />

              <label>INTRODUCTION</label>
              <textarea
                rows={4}
                value={site.description}
                onChange={(event) => setSite((current) => ({ ...current, description: event.target.value }))}
              />

              <label>BUTTON TEXT</label>
              <input
                value={site.cta}
                onChange={(event) => setSite((current) => ({ ...current, cta: event.target.value }))}
              />

              <div className="color-row">
                <label>ACCENT COLOR</label>
                <div className="color-box">
                  <input
                    type="color"
                    value={site.color}
                    onChange={(event) => setSite((current) => ({ ...current, color: event.target.value }))}
                  />
                  <span>{site.color.toUpperCase()}</span>
                </div>
              </div>

              <button className="apply-button" onClick={applyEdits}>Apply changes</button>
            </aside>

            <div className="preview-panel">
              <div className="browser-toolbar">
                <div className="dots">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <div className="browser-url">{site.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.sitespark.site</div>
                <button className="mini-open" onClick={openPreview}>↗</button>
              </div>

              <div className={`preview-frame ${device === "mobile" ? "mobile" : ""}`}>
                <iframe title="generated preview" srcDoc={previewHtml} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {toast && <div className="toast">{toast}</div>}

      {showPublish && (
        <div className="modal-backdrop" onClick={() => setShowPublish(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPublish(false)}>×</button>
            <div className="modal-kicker">YOUR SITE IS READY</div>
            <h4>Publish with GitHub Pages</h4>
            <p>
              Export the HTML, upload it to a repo, and turn on GitHub Pages from the repository settings.
            </p>

            <div className="steps">
              <div><span>1</span> Export HTML</div>
              <div><span>2</span> Add as <code>index.html</code></div>
              <div><span>3</span> Enable Pages</div>
            </div>

            <button className="modal-button" onClick={exportHtml}>Download website</button>
          </div>
        </div>
      )}

      {showHelp && (
        <div className="modal-backdrop" onClick={() => setShowHelp(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowHelp(false)}>×</button>
            <div className="modal-kicker">HOW IT WORKS</div>
            <h4>Turn ideas into websites</h4>
            <p>
              Describe a business or idea, adjust the details, then export a standalone site you can host anywhere.
            </p>
            <ol className="help-list">
              <li>Describe the site you want.</li>
              <li>Edit the headline, intro, CTA, and colors.</li>
              <li>Export HTML and publish for free.</li>
            </ol>
          </div>
        </div>
      )}
    </main>
  );
}
