export type SiteData = {
  id: string;
  name: string;
  headline: string;
  description: string;
  cta: string;
  color: string;
  prompt: string;
};

type BusinessProfile = {
  name: string;
  headline: string;
  description: string;
  cta: string;
  label: string;
  visual: string;
  bg: string;
};

export function slugify(value: string) {
  return (value || "my-website")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "my-website";
}

export function safeColor(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#d5f365";
}

export function readableColor(hex: string) {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16);
  const g = Number.parseInt(value.slice(2, 4), 16);
  const b = Number.parseInt(value.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155 ? "#172014" : "#ffffff";
}

export function detectBusiness(prompt: string): BusinessProfile {
  const cleaned = prompt.toLowerCase();
  const options: BusinessProfile[] = [
    {
      name: "Sunday & Co.",
      headline: "A little pause in your day.",
      description:
        "Come in for something good. We make thoughtful food and drinks with lovely ingredients, a warm welcome, and plenty of care.",
      cta: "Come on in",
      label: "GOOD THINGS, MADE DAILY",
      visual: "☕",
      bg: "#f1eadc",
    },
    {
      name: "Wildflower Studio",
      headline: "A little more wonder, in bloom.",
      description:
        "Seasonal flowers, gathered thoughtfully and arranged by hand. Let us bring a little joy to your everyday or your most special moments.",
      cta: "Find your flowers",
      label: "GROWN WITH A LITTLE WONDER",
      visual: "✿",
      bg: "#f2e8e4",
    },
    {
      name: "Studio Sunday",
      headline: "Stories worth staying for.",
      description:
        "I make honest, artful work for people with a story to tell. A thoughtful eye, an easygoing process, and images that feel like you.",
      cta: "Let’s make something",
      label: "INDEPENDENT CREATIVE STUDIO",
      visual: "◉",
      bg: "#e9e9de",
    },
    {
      name: "Still Room",
      headline: "Find your way back to you.",
      description:
        "A welcoming space to move, breathe, and feel a little more like yourself. Come as you are; we’ll meet you there.",
      cta: "See the schedule",
      label: "SPACE TO MOVE & BREATHE",
      visual: "⌁",
      bg: "#e5eadb",
    },
    {
      name: "Good Form Goods",
      headline: "Made well. Made to stay.",
      description:
        "Everyday essentials with a little more thought behind them. Made in small batches, chosen with care, and designed to be part of your story.",
      cta: "Explore the collection",
      label: "OBJECTS FOR EVERYDAY LIVING",
      visual: "◇",
      bg: "#ebdfd4",
    },
    {
      name: "Northline & Co.",
      headline: "Good work starts with a conversation.",
      description:
        "We help good people make their next move with clarity and confidence. Practical expertise, a personal approach, and a plan that fits you.",
      cta: "Let’s talk",
      label: "THOUGHTFUL WORK, REAL RESULTS",
      visual: "↗",
      bg: "#e7ece4",
    },
  ];

  const match = options.find((option) =>
    ["coffee", "cafe", "café", "bakery", "restaurant", "food", "tea", "flower", "florist", "bouquet", "garden", "photo", "photographer", "camera", "portfolio", "artist", "design", "creative", "yoga", "wellness", "fitness", "pilates", "coach", "shop", "store", "product", "brand", "clothing", "jewelry", "consult", "lawyer", "account", "agency", "business", "service"].some((keyword) => cleaned.includes(keyword) && option.name.toLowerCase().includes(keyword.split(" ")[0]) || option.name.toLowerCase().includes(keyword))
  );

  return match || {
    name: "Brightside Studio",
    headline: "A good idea deserves a good beginning.",
    description:
      "We’re here to make the complicated feel simple. Thoughtful work, a friendly approach, and a little spark in everything we do.",
    cta: "Get to know us",
    label: "A SMALL BUSINESS WITH BIG HEART",
    visual: "✳",
    bg: "#ececdf",
  };
}

export function generateFallbackSite(prompt: string): SiteData {
  const business = detectBusiness(prompt);
  const extractedName = prompt.match(/(?:called|named|name is|brand is)\s+([^,.!?]+)/i)?.[1]?.trim();
  const name = (extractedName || business.name)
    .replace(/\s+(website|site|business|studio)$/i, "")
    .trim();

  return {
    id: slugify(name),
    name,
    headline: business.headline,
    description: business.description,
    cta: business.cta,
    color: "#d5f365",
    prompt: prompt.trim(),
  };
}

export function buildGeneratedHtml(site: SiteData) {
  const business = detectBusiness(site.prompt || "");
  const color = safeColor(site.color || "#d5f365");
  const textColor = readableColor(color);
  const safeName = String(site.name || "My Website").replace(/<[^>]*>/g, "");
  const title = String(site.name || "My Website").replace(/&/g, "&amp;");
  const headline = String(site.headline || business.headline).replace(/&/g, "&amp;");
  const description = String(site.description || business.description).replace(/&/g, "&amp;");
  const cta = String(site.cta || business.cta).replace(/&/g, "&amp;");

  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: "DM Sans", sans-serif;
          background: #fbfaf7;
          color: #1d201b;
        }
        a { text-decoration: none; }
        .shell { max-width: 1180px; margin: 0 auto; padding: 0 32px; }
        nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 76px;
        }
        .brand {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.07em;
          color: #1f241c;
        }
        .brand i { color: #93ac36; font-style: normal; }
        .nav-links { display: flex; align-items: center; gap: 22px; }
        .nav-links a {
          color: #5a6059;
          font-size: 12px;
        }
        .nav-links .focus {
          background: #1d201b;
          color: white;
          padding: 10px 14px;
          border-radius: 8px;
        }
        .hero {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
          padding: 36px 0 50px;
        }
        .eyebrow {
          color: #7f877d;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 0.18em;
          margin-bottom: 16px;
        }
        .eyebrow span { color: #8ea846; margin-right: 8px; }
        h1 {
          font-family: Georgia, serif;
          font-size: clamp(3rem, 5vw, 6rem);
          line-height: 0.95;
          letter-spacing: -0.06em;
          margin: 0;
          max-width: 560px;
        }
        .lead {
          margin-top: 20px;
          color: #6c726a;
          max-width: 430px;
          line-height: 1.8;
          font-size: 14px;
        }
        .cta-row {
          display: flex;
          gap: 18px;
          align-items: center;
          margin-top: 26px;
        }
        .primary {
          background: ${color};
          color: ${textColor};
          padding: 13px 16px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
        }
        .secondary {
          color: #4f544d;
          font-size: 11px;
        }
        .art-card {
          background: ${business.bg};
          min-height: 360px;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
        }
        .sun {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: ${color};
          right: 12%;
          top: 10%;
          opacity: 0.9;
        }
        .shape-one, .shape-two {
          position: absolute;
          bottom: -30px;
          width: 220px;
          height: 260px;
          border-radius: 120px 120px 18px 18px;
        }
        .shape-one { left: 16%; background: #839169; transform: rotate(-8deg); }
        .shape-two { right: 10%; background: #c49b76; transform: rotate(8deg); }
        .art-label {
          position: absolute;
          left: 22px;
          bottom: 20px;
          padding: 10px 12px;
          background: rgba(255,255,255,0.7);
          border-radius: 8px;
          font-size: 9px;
          letter-spacing: 0.15em;
          font-weight: 700;
        }
        .art-glyph {
          position: absolute;
          top: 45%;
          left: 47%;
          transform: translate(-50%, -50%);
          font-size: 54px;
          color: rgba(255,255,255,0.8);
        }
        .features {
          background: #edf0ea;
          padding: 52px 0;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 34px;
        }
        .feature {
          border-top: 1px solid #d6dcd1;
          padding-top: 16px;
        }
        .feature span {
          color: #859a45;
          font-size: 11px;
          letter-spacing: 0.12em;
          font-weight: 700;
        }
        .feature h3 {
          margin: 14px 0 8px;
          font-size: 18px;
        }
        .feature p {
          margin: 0;
          color: #666d62;
          line-height: 1.8;
          font-size: 12px;
        }
        .about {
          display: flex;
          justify-content: space-between;
          gap: 40px;
          padding: 64px 0 24px;
        }
        .about h2 {
          margin: 8px 0 0;
          font-size: clamp(2rem, 2.5vw, 3rem);
          letter-spacing: -0.05em;
          font-family: Georgia, serif;
        }
        .about p {
          max-width: 430px;
          color: #666d62;
          line-height: 1.9;
          font-size: 12px;
        }
        .contact {
          background: #212720;
          color: white;
          padding: 40px 0;
          margin-top: 26px;
        }
        .contact-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
        }
        .contact h3 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 32px;
          letter-spacing: -0.04em;
        }
        .contact p {
          margin: 6px 0 0;
          color: #c5c9c3;
          font-size: 12px;
        }
        .contact a {
          background: ${color};
          color: #161b18;
          padding: 13px 16px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 11px;
        }
        footer {
          padding: 18px 0 28px;
          color: #7a817a;
          font-size: 10px;
          display: flex;
          justify-content: space-between;
        }
        @media (max-width: 720px) {
          .shell { padding: 0 22px; }
          nav { padding-top: 18px; }
          .nav-links { gap: 12px; }
          .nav-links a:not(.focus) { display: none; }
          .hero, .about, .contact-row { grid-template-columns: 1fr; display: grid; }
          .feature-grid { grid-template-columns: 1fr; }
          footer { display: block; }
        }
      </style>
    </head>
    <body>
      <div class="shell">
        <nav>
          <div class="brand">${safeName}<i>.</i></div>
          <div class="nav-links">
            <a href="#story">Our story</a>
            <a href="#contact">Say hello</a>
            <a href="#contact" class="focus">${cta} ↗</a>
          </div>
        </nav>

        <section class="hero">
          <div>
            <div class="eyebrow"><span>✳</span>${business.label}</div>
            <h1>${headline}</h1>
            <p class="lead">${description}</p>
            <div class="cta-row">
              <a href="#contact" class="primary">${cta} ↗</a>
              <a href="#story" class="secondary">A little about us ↓</a>
            </div>
          </div>
          <div class="art-card">
            <div class="sun"></div>
            <div class="shape-one"></div>
            <div class="shape-two"></div>
            <div class="art-glyph">${business.visual}</div>
            <div class="art-label">${safeName.toUpperCase()} · MADE WITH CARE</div>
          </div>
        </section>
      </div>

      <section class="features">
        <div class="shell feature-grid">
          <article class="feature">
            <span>01 / THOUGHTFUL</span>
            <h3>Made with intention</h3>
            <p>We believe good details make a lasting first impression.</p>
          </article>
          <article class="feature">
            <span>02 / FRIENDLY</span>
            <h3>Warm and welcoming</h3>
            <p>People remember how you made them feel, not only what you offered.</p>
          </article>
          <article class="feature">
            <span>03 / LOCAL</span>
            <h3>Rooted in the neighborhood</h3>
            <p>Thoughtful work and real connections grow from everyday consistency.</p>
          </article>
        </div>
      </section>

      <div class="shell about" id="story">
        <div>
          <div class="eyebrow"><span>✳</span> A LITTLE ABOUT US</div>
          <h2>Good things happen when you make room for them.</h2>
        </div>
        <p>${description}</p>
      </div>

      <div class="contact" id="contact">
        <div class="shell contact-row">
          <div>
            <h3>We’d love to meet you.</h3>
            <p>Drop us a note and let’s make something wonderful happen.</p>
          </div>
          <a href="mailto:hello@example.com">${cta} ↗</a>
        </div>
      </div>

      <div class="shell">
        <footer>
          <span>© ${new Date().getFullYear()} ${safeName}. Made with care.</span>
          <span>Made with ✦ SiteSpark</span>
        </footer>
      </div>
    </body>
  </html>`;
}
