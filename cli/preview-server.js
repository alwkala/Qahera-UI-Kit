/**
 * Qahera UI Kit — Local Dev & Preview Server v1.7.0
 * 
 * Zero-dependency static server with auto port detection and comprehensive visual hub.
 */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.yaml': 'text/yaml; charset=utf-8',
  '.yml': 'text/yaml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

function generateHubIndex() {
  const templatesDir = path.join(ROOT_DIR, 'templates');
  const tplDirs = fs.existsSync(templatesDir) ? fs.readdirSync(templatesDir, { withFileTypes: true }) : [];
  const templates = tplDirs.filter(d => d.isDirectory()).map(d => d.name);

  const previewsDir = path.join(ROOT_DIR, 'examples', 'previews');
  const previewFiles = fs.existsSync(previewsDir) ? fs.readdirSync(previewsDir) : [];
  const previews = previewFiles.filter(f => f.endsWith('.html'));

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="zamalek" data-mode="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>خادم معاينات قاهرة المعمارية · Qahera Dev Hub</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@600;700;800&family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="/dist/qahera-tokens.css">
  <link rel="stylesheet" href="/dist/qahera-themes.css">
  <link rel="stylesheet" href="/dist/qahera.css">
</head>
<body style="background-color: var(--qhr-surface-page, #0A0D14); color: var(--qhr-text-primary, #F8FAFC); font-family: var(--qhr-font-body, 'Cairo', sans-serif); padding: var(--qhr-space-6, 24px);">

  <header style="max-width: 1200px; margin: 0 auto; margin-block-end: var(--qhr-space-8, 32px); text-align: center;">
    <span class="qhr-badge qhr-badge--primary qhr-badge--pill">Qahera Dev Hub v1.7.0</span>
    <h1 style="font-family: var(--qhr-font-heading, 'Alexandria', sans-serif); margin-block: var(--qhr-space-3, 12px); font-size: 2rem;">
      منصة المعاينة والتطوير المحلية
    </h1>
    <p style="color: var(--qhr-text-secondary); max-width: 600px; margin: 0 auto; line-height: 1.7;">
      خادم محلي خفيف يربط كافة القوالب (20 قالب)، المكونات المعمارية، واستوديو التخصيص.
    </p>
  </header>

  <main style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--qhr-space-6, 24px);">

    <!-- Section 1: Application Templates -->
    <section class="qhr-card qhr-card--elevated" style="padding: var(--qhr-space-6, 24px);">
      <h2 style="font-family: var(--qhr-font-heading); font-size: 1.25rem; margin-block-end: var(--qhr-space-4);">
        قوالب التطبيقات الإنتاجية (${templates.length})
      </h2>
      <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: var(--qhr-space-2);">
        ${templates.map(t => `
          <li>
            <a href="/templates/${t}/index.html" style="color: var(--qhr-color-primary); text-decoration: none; display: flex; justify-content: space-between; padding: var(--qhr-space-2); border-radius: var(--qhr-radius-sm); border: 1px solid var(--qhr-border-subtle);">
              <span>${t}</span>
              <span style="color: var(--qhr-text-muted);">معاينة ❯</span>
            </a>
          </li>
        `).join('')}
      </ul>
    </section>

    <!-- Section 2: Component Previews -->
    <section class="qhr-card qhr-card--elevated" style="padding: var(--qhr-space-6, 24px);">
      <h2 style="font-family: var(--qhr-font-heading); font-size: 1.25rem; margin-block-end: var(--qhr-space-4);">
        معاينات المكونات المستقلة (${previews.length})
      </h2>
      <div style="max-height: 480px; overflow-y: auto; display: flex; flex-direction: column; gap: var(--qhr-space-2);">
        ${previews.map(p => `
          <a href="/examples/previews/${p}" style="color: var(--qhr-text-secondary); text-decoration: none; display: flex; justify-content: space-between; padding: var(--qhr-space-2); border-radius: var(--qhr-radius-sm); border: 1px solid var(--qhr-border-subtle);">
            <span>${p.replace('.html', '')}</span>
            <span style="color: var(--qhr-text-muted);">عرض ❯</span>
          </a>
        `).join('')}
      </div>
    </section>

  </main>

</body>
</html>`;
}

function startDevServer(options = {}) {
  const initialPort = options.port || 3300;
  let currentPort = initialPort;

  function attemptListen(port) {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURIComponent(req.url.split('?')[0]);

      if (reqPath === '/' || reqPath === '/index.html') {
        const html = generateHubIndex();
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
        return;
      }

      const filePath = path.join(ROOT_DIR, reqPath);

      if (!filePath.startsWith(ROOT_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }

      fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end(`File not found: ${reqPath}`);
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const mime = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': mime });
        fs.createReadStream(filePath).pipe(res);
      });
    });

    server.on('error', err => {
      if (err.code === 'EADDRINUSE') {
        currentPort++;
        if (currentPort <= initialPort + 10) {
          attemptListen(currentPort);
        } else {
          console.error(`\x1b[31m[ERROR]\x1b[0m Ports ${initialPort} to ${currentPort} are all busy.`);
          process.exit(1);
        }
      } else {
        console.error('\x1b[31m[ERROR]\x1b[0m Server error:', err.message);
      }
    });

    server.listen(port, () => {
      console.log('\n\x1b[1;36m╔═══════════════════════════════════════════════════════════════════════════╗\x1b[0m');
      console.log('\x1b[1;36m║                  QAHERA LOCAL PREVIEW & DEV SERVER                        ║\x1b[0m');
      console.log('\x1b[1;36m╚═══════════════════════════════════════════════════════════════════════════╝\x1b[0m\n');
      console.log(`  \x1b[32m➜\x1b[0m Dev Hub running at: \x1b[1;36mhttp://localhost:${port}/\x1b[0m`);
      console.log(`  \x1b[90mPress Ctrl+C to terminate the server.\x1b[0m\n`);
    });
  }

  attemptListen(currentPort);
}

module.exports = { startDevServer };

if (require.main === module) {
  const portArg = process.argv.find(a => a.startsWith('--port='));
  const port = portArg ? parseInt(portArg.split('=')[1], 10) : 3300;
  startDevServer({ port });
}
