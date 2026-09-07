const fs = require('fs');
const path = require('path');
const { parseYaml } = require('../compiler/yaml');

const registryPath = path.join(__dirname, '..', 'icons', 'registry.yaml');
const outputPath = path.join(__dirname, '..', 'renderers', 'html', 'native', 'icons.svg');

const registry = parseYaml(fs.readFileSync(registryPath, 'utf8'), registryPath);

let svg = '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n';

for (const [name, icon] of Object.entries(registry.icons)) {
  svg += `  <symbol id="qhr-icon-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n`;
  svg += `    <path d="${icon.svg_path}" />\n`;
  svg += '  </symbol>\n';
}

svg += '</svg>\n';

fs.writeFileSync(outputPath, svg, 'utf8');
console.log(`Successfully generated icons.svg with ${Object.keys(registry.icons).length} icons.`);
