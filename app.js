const $ = (selector) => document.querySelector(selector);
const promptInput = $('#promptInput');
const sitePreview = $('#sitePreview');
const fields = { name: $('#editName'), headline: $('#editHeadline'), description: $('#editDescription'), cta: $('#editCta'), color: $('#themeColor') };
const initialSite = { id: 'northstar-coffee', name: 'Northstar Coffee', headline: 'Find your little corner of calm.', description: 'Good coffee, warm people, and a little room to breathe. We roast in small batches and pour every cup with care, right here in the neighborhood.', cta: 'Find your coffee', color: '#d5f365', prompt: promptInput.value };
let currentSite = { ...initialSite };
let projects = [];
let toastTimer;

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}
function slugify(value) {
  return (value || 'my-website').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'my-website';
}
function readableColor(hex) {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16), g = parseInt(value.slice(2, 4), 16), b = parseInt(value.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155 ? '#172014' : '#ffffff';
}
function detectBusiness(prompt) {
  const p = prompt.toLowerCase();
  const options = [
    { keys: ['coffee', 'cafe', 'café', 'bakery', 'restaurant', 'food', 'tea'], name: 'Sunday & Co.', headline: 'A little pause in your day.', description: 'Come in for something good. We make thoughtful food and drinks with lovely ingredients, a warm welcome, and plenty of care.', cta: 'Come on in', visual: '☕', label: 'GOOD THINGS, MADE DAILY', bg: '#f0eadd' },
    { keys: ['flower', 'florist', 'bouquet', 'garden'], name: 'Wildflower Studio', headline: 'A little more wonder, in bloom.', description: 'Seasonal flowers, gathered thoughtfully and arranged by hand. Let us bring a little joy to your everyday or your most special moments.', cta: 'Find your flowers', visual: '✿', label: 'GROWN WITH A LITTLE WONDER', bg: '#f2e8e4' },
    { keys: ['photo', 'photographer', 'camera', 'portfolio', 'artist', 'design', 'creative'], name: 'Studio Sunday', headline: 'Stories worth staying for.', description: 'I make honest, artful work for people with a story to tell. A thoughtful eye, an easygoing process, and images that feel like you.', cta: 'Let’s make something', visual: '◉', label: 'INDEPENDENT CREATIVE STUDIO', bg: '#e8e9df' },
    { keys: ['yoga', 'wellness', 'fitness', 'pilates', 'coach'], name: 'Still Room', headline: 'Find your way back to you.', description: 'A welcoming space to move, breathe, and feel a little more like yourself. Come as you are; we’ll meet you there.', cta: 'See the schedule', visual: '⌁', label: 'SPACE TO MOVE & BREATHE', bg: '#e4e9dc' },
    { keys: ['shop', 'store', 'product', 'brand', 'clothing', 'jewelry'], name: 'Good Form Goods', headline: 'Made well. Made to stay.', description: 'Everyday essentials with a little more thought behind them. Made in small batches, chosen with care, and designed to be part of your story.', cta: 'Explore the collection', visual: '◇', label: 'OBJECTS FOR EVERYDAY LIVING', bg: '#eae6dc' },
    { keys: ['consult', 'lawyer', 'account', 'agency', 'business', 'service'], name: 'Northline & Co.', headline: 'Good work starts with a conversation.', description: 'We help good people make their next move with clarity and confidence. Practical expertise, a personal approach, and a plan that fits you.', cta: 'Let’s talk', visual: '↗', label: 'THOUGHTFUL WORK, REAL RESULTS', bg: '#e4e8e1' }
  ];
  return options.find((item) => item.keys.some((key) => p.includes(key))) || { name: 'Brightside Studio', headline: 'A good idea deserves a good beginning.', description: 'We’re here to make the complicated feel simple. Thoughtful work, a friendly approach, and a little spark in everything we do.', cta: 'Get to know us', visual: '✳', label: 'A SMALL BUSINESS WITH BIG HEART', bg: '#ececdf' };
}
function createWebsite(site) {
  const business = detectBusiness(site.prompt || '');
  const name = escapeHTML(site.name);
  const headline = escapeHTML(site.headline);
  const description = escapeHTML(site.description);
  const cta = escapeHTML(site.cta);
  const color = /^#[\da-f]{6}$/i.test(site.color) ? site.color : '#d5f365';
  const textColor = readableColor(color);
  const safeName = name.replace(/<[^>]*>/g, '');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${description}"><title>${name} — ${headline}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet"><style>
*{box-sizing:border-box}body{margin:0;background:#fbfaf7;color:#22241f;font-family:'DM Sans',sans-serif}nav{height:76px;max-width:1160px;margin:auto;padding:0 34px;display:flex;align-items:center;justify-content:space-between}.logo{font:800 17px 'Manrope',sans-serif;letter-spacing:-.6px}.logo i{font-style:normal;color:#829e42}nav a{font-size:12px;color:#5e625a;text-decoration:none;margin-left:30px}.nav-cta{padding:10px 15px;border-radius:4px;background:#22241f;color:#fff!important}.hero{max-width:1160px;margin:auto;padding:78px 34px 85px;display:grid;grid-template-columns:1.08fr .92fr;gap:55px;align-items:center;min-height:490px}.eyebrow{font-size:10px;letter-spacing:1.7px;font-weight:700;color:#858a7d}.eyebrow span{color:#92a94d;margin-right:6px}.hero h1{max-width:550px;margin:18px 0 18px;font:600 clamp(46px,6.1vw,76px)/1.04 Georgia,serif;letter-spacing:-3.2px}.hero p{max-width:440px;color:#73766f;font-size:14px;line-height:1.85;margin:0}.hero-actions{display:flex;align-items:center;gap:20px;margin-top:28px}.primary{display:inline-flex;align-items:center;gap:20px;padding:13px 17px;border-radius:4px;text-decoration:none;background:${color};color:${textColor};font-size:11px;font-weight:700}.text-link{color:#53574f;text-decoration:none;font-size:11px}.hero-art{height:380px;background:${business.bg};position:relative;overflow:hidden;display:grid;place-items:center}.sun{position:absolute;width:210px;height:210px;border-radius:50%;background:${color};right:10%;top:10%;opacity:.9}.shape{position:absolute;width:225px;height:275px;bottom:-24px;left:18%;border-radius:120px 120px 12px 12px;background:#8e9c78;transform:rotate(-5deg)}.shape2{position:absolute;width:180px;height:230px;bottom:-30px;right:8%;border-radius:110px 110px 5px 5px;background:#c08f70;transform:rotate(8deg)}.art-label{position:absolute;z-index:1;left:20px;bottom:19px;padding:10px 12px;background:#fbfaf7ed;font-size:9px;letter-spacing:1px;font-weight:700}.art-glyph{position:absolute;z-index:1;top:40%;left:44%;font-size:45px;color:#fff9}.features{background:#f0f0e9;padding:55px 34px}.feature-inner{max-width:1092px;margin:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:38px}.feature{border-top:1px solid #d9dbd1;padding-top:16px}.feature span{color:#879b52;font-size:13px}.feature h3{font:700 14px 'Manrope',sans-serif;margin:14px 0 8px}.feature p{max-width:260px;color:#777b71;font-size:11px;line-height:1.7;margin:0}.about{max-width:1092px;margin:auto;padding:65px 34px;display:flex;justify-content:space-between;align-items:center;gap:45px}.about h2{max-width:440px;font:500 32px/1.2 Georgia,serif;margin:12px 0}.about p{max-width:420px;color:#777b71;font-size:12px;line-height:1.8}.contact{background:#242820;color:#fff;padding:42px 34px}.contact-inner{max-width:1092px;margin:auto;display:flex;justify-content:space-between;align-items:center;gap:20px}.contact h2{font:500 27px Georgia,serif;margin:0 0 7px}.contact p{font-size:11px;color:#bdc1b6;margin:0}.contact a{color:#22241f;background:${color};padding:12px 16px;border-radius:4px;text-decoration:none;font-size:10px;font-weight:700}footer{max-width:1092px;padding:18px 34px;margin:auto;display:flex;justify-content:space-between;color:#92968c;font-size:9px}footer b{color:#849949}@media(max-width:700px){nav{height:65px;padding:0 20px}nav a{margin-left:13px;font-size:10px}.hero{display:flex;flex-direction:column;padding:50px 20px 36px;gap:34px;align-items:stretch}.hero h1{font-size:56px}.hero-art{height:300px}.feature-inner{grid-template-columns:1fr;gap:25px}.features{padding:40px 22px}.about{padding:45px 22px;display:block}.contact{padding:34px 22px}.contact-inner{align-items:flex-start;flex-direction:column}footer{padding:16px 22px}.nav-cta{padding:8px 9px}}
</style></head><body><nav><div class="logo">${name}<i>.</i></div><div><a href="#story">Our story</a><a href="#contact">Say hello</a><a class="nav-cta" href="#contact">${cta} ↗</a></div></nav><main><section class="hero"><div><div class="eyebrow"><span>✳</span>${escapeHTML(business.label)}</div><h1>${headline}</h1><p>${description}</p><div class="hero-actions"><a class="primary" href="#contact">${cta} <span>↗</span></a><a class="text-link" href="#story">A little about us ↓</a></div></div><div class="hero-art"><div class="sun"></div><div class="shape"></div><div class="shape2"></div><div class="art-glyph">${business.visual}</div><div class="art-label">${safeName.toUpperCase()} &nbsp;·&nbsp; MADE WITH CARE</div></div></section><section class="features"><div class="feature-inner"><article class="feature"><span>01 / A THOUGHTFUL TOUCH</span><h3>Made with intention</h3><p>We believe the small details make all the difference. Nothing here is an afterthought.</p></article><article class="feature"><span>02 / GOOD PEOPLE</span><h3>Always a warm welcome</h3><p>Come as you are. There’s always room for one more and time for a proper hello.</p></article><article class="feature"><span>03 / RIGHT HERE</span><h3>Rooted in the neighborhood</h3><p>Locally minded, community loved, and happy to call this little corner home.</p></article></div></section><section class="about" id="story"><div><div class="eyebrow"><span>✳</span> A LITTLE ABOUT US</div><h2>Good things happen when you make room for them.</h2></div><p>${description} Whether it’s your first visit or your fiftieth, we’re glad you found us. Take a look around, make yourself at home, and reach out if there’s anything we can do for you.</p></section><section class="contact" id="contact"><div class="contact-inner"><div><h2>We’d love to meet you.</h2><p>Drop us a note and let’s make something good happen.</p></div><a href="mailto:hello@example.com">${cta} &nbsp;↗</a></div></section></main><footer><span>© ${new Date().getFullYear()} ${name}. Made with care.</span><span>Made with <b>✦ SiteSpark</b></span></footer></body></html>`;
}
function updatePreview() {
  sitePreview.srcdoc = createWebsite(currentSite);
  $('#previewUrl').textContent = `${slugify(currentSite.name)}.sitespark.site`;
  $('#topProjectName').textContent = currentSite.name;
  document.title = `${currentSite.name} — SiteSpark`;
}
function fillFields(site) {
  fields.name.value = site.name;
  fields.headline.value = site.headline;
  fields.description.value = site.description;
  fields.cta.value = site.cta;
  fields.color.value = site.color;
  $('#colorValue').textContent = site.color.toUpperCase();
  promptInput.value = site.prompt || '';
  updateCharCount();
}
function saveCurrent() {
  const item = { ...currentSite, id: currentSite.id || slugify(currentSite.name) };
  const index = projects.findIndex((project) => project.id === item.id);
  if (index >= 0) projects[index] = item;
  else projects.unshift(item);
  projects = projects.slice(0, 8);
  try { localStorage.setItem('sitespark-projects', JSON.stringify(projects)); } catch (_) { /* private browsing can disable storage */ }
  renderProjects();
  $('#topProjectName').textContent = currentSite.name;
}
function renderProjects() {
  const list = $('#projectList');
  list.innerHTML = '';
  projects.forEach((project) => {
    const button = document.createElement('button');
    button.className = `project-item${project.id === currentSite.id ? ' selected' : ''}`;
    button.textContent = project.name;
    button.title = project.name;
    button.addEventListener('click', () => loadProject(project.id));
    list.appendChild(button);
  });
  $('#projectCount').textContent = String(projects.length || 0);
}
function loadProject(id) {
  const project = projects.find((item) => item.id === id);
  if (!project) return;
  currentSite = { ...project };
  fillFields(currentSite);
  updatePreview();
  renderProjects();
  showToast(`Opened ${currentSite.name}`);
}
function updateCharCount() { $('#charCount').textContent = `${promptInput.value.length} / 600`; }
function makeSiteFromPrompt(prompt) {
  const business = detectBusiness(prompt);
  const words = prompt.trim().split(/\s+/).filter(Boolean);
  const nameMatch = prompt.match(/(?:called|named|name is)\s+([^,.!?]+)/i);
  let name = nameMatch ? nameMatch[1].trim().replace(/\b\w/g, (letter) => letter.toUpperCase()) : business.name;
  if (!nameMatch && words.length > 3 && !business.keys?.length) name = business.name;
  const cleanBusiness = name.replace(/\s+(website|site|business)$/i, '');
  const sentence = prompt.replace(/\s+/g, ' ').trim().replace(/[.!?]+$/, '');
  const description = business.description;
  let headline = business.headline;
  if (/modern|bold|luxury|playful|friendly|elegant|minimal/i.test(prompt)) headline = business.headline;
  const cta = business.cta;
  return { id: slugify(cleanBusiness), name: cleanBusiness, headline, description, cta, color: '#d5f365', prompt: sentence, generatedAt: Date.now() };
}
function generate() {
  const prompt = promptInput.value.trim();
  if (!prompt) { showToast('Add a short description first.'); promptInput.focus(); return; }
  const button = $('#generateButton');
  button.disabled = true;
  button.innerHTML = '<span class="button-sparkle">✦</span> Creating your draft…';
  window.setTimeout(() => {
    currentSite = makeSiteFromPrompt(prompt);
    fillFields(currentSite);
    updatePreview();
    saveCurrent();
    button.disabled = false;
    button.innerHTML = '<span class="button-sparkle">✦</span> Generate website <span class="button-arrow">→</span>';
    showToast('Your new website draft is ready. Make it yours!');
  }, 450);
}
function applyEdits() {
  currentSite = { ...currentSite, name: fields.name.value.trim() || 'My New Website', headline: fields.headline.value.trim() || 'A good idea deserves a good beginning.', description: fields.description.value.trim() || 'Thoughtful work, a friendly approach, and a little spark in everything we do.', cta: fields.cta.value.trim() || 'Get in touch', color: fields.color.value };
  if (!currentSite.id || currentSite.id === 'northstar-coffee') currentSite.id = slugify(currentSite.name);
  updatePreview(); saveCurrent(); showToast('Changes applied to your website.');
}
function exportWebsite() {
  const html = createWebsite(currentSite);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${slugify(currentSite.name)}.html`;
  document.body.appendChild(link); link.click(); link.remove();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  showToast('Website downloaded. Rename it to index.html to publish.');
}
function showToast(message) {
  const toast = $('#toast'); toast.textContent = message; toast.classList.add('show');
  clearTimeout(toastTimer); toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2800);
}
function openModal(id) { const modal = $(id); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); }
function closeModal(id) { const modal = $(id); modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }

try {
  const saved = JSON.parse(localStorage.getItem('sitespark-projects') || '[]');
  if (Array.isArray(saved)) projects = saved;
} catch (_) { projects = []; }
if (!projects.length) { projects = [{ ...initialSite }]; }
currentSite = { ...projects[0] };
fillFields(currentSite); updatePreview(); renderProjects();

promptInput.addEventListener('input', updateCharCount);
promptInput.addEventListener('keydown', (event) => { if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') generate(); });
$('#generateButton').addEventListener('click', generate);
$('#applyEdits').addEventListener('click', applyEdits);
$('#themeColor').addEventListener('input', () => { $('#colorValue').textContent = fields.color.value.toUpperCase(); currentSite.color = fields.color.value; updatePreview(); });
$('#exportButton').addEventListener('click', exportWebsite);
$('#modalExport').addEventListener('click', exportWebsite);
$('#publishButton').addEventListener('click', () => openModal('#publishModal'));
$('#closeModal').addEventListener('click', () => closeModal('#publishModal'));
$('#helpButton').addEventListener('click', () => openModal('#helpModal'));
$('#closeHelp').addEventListener('click', () => closeModal('#helpModal'));
document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.addEventListener('click', (event) => { if (event.target === backdrop) { backdrop.classList.remove('open'); backdrop.setAttribute('aria-hidden', 'true'); } }));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') document.querySelectorAll('.modal-backdrop.open').forEach((modal) => closeModal(`#${modal.id}`)); });
document.querySelectorAll('.suggestion-chip').forEach((chip) => chip.addEventListener('click', () => { promptInput.value = chip.dataset.prompt; updateCharCount(); promptInput.focus(); }));
$('#newProject').addEventListener('click', () => { promptInput.value = ''; updateCharCount(); promptInput.focus(); showToast('Describe your next website idea above.'); $('#sidebar').classList.remove('open'); });
$('#navBuilder').addEventListener('click', () => $('#sidebar').classList.remove('open'));
$('#mobileMenu').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
$('#refreshPreview').addEventListener('click', () => { updatePreview(); showToast('Preview refreshed.'); });
$('#openPreview').addEventListener('click', () => { const opened = window.open('', '_blank'); if (opened) { opened.document.open(); opened.document.write(createWebsite(currentSite)); opened.document.close(); } else showToast('Allow pop-ups to open the preview in a new tab.'); });
document.querySelectorAll('.device-button').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('.device-button').forEach((item) => item.classList.toggle('active', item === button)); $('#previewViewport').classList.toggle('mobile', button.dataset.device === 'mobile'); }));
$('#editName').addEventListener('input', () => { $('#topProjectName').textContent = fields.name.value || 'Untitled website'; });
