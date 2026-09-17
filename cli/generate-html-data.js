/**
 * Qahera UI Kit — HTML Custom Data Generator v1.0
 * 
 * Generates official VS Code / Cursor / Antigravity HTML Custom Data (qahera.html-data.json)
 * Conforming to: https://raw.githubusercontent.com/microsoft/vscode-html-languageservice/main/docs/customData.schema.json
 * 
 * Enables full autocomplete and hover documentation for:
 * 1. Global attributes (data-theme with all 13 Cairo themes, data-mode, dir)
 * 2. All 45 canonical Web Components (<qhr-button>, <qhr-card>, <qhr-badge>, etc.)
 * 3. Component props & attributes (variant, size, tone, shape, state)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const CONTRACTS_DIR = path.join(ROOT_DIR, 'contracts', 'components');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const OUTPUT_ROOT = path.join(ROOT_DIR, 'qahera.html-data.json');
const OUTPUT_DIST = path.join(DIST_DIR, 'qahera.html-data.json');

// Downstream website repository path
const DOWNSTREAM_DIR = path.resolve(ROOT_DIR, '..', '..', '..', 'Qahera');
const DOWNSTREAM_ROOT = path.join(DOWNSTREAM_DIR, 'qahera.html-data.json');
const DOWNSTREAM_DIST = path.join(DOWNSTREAM_DIR, 'dist', 'qahera.html-data.json');

// Cairo Neighborhood Themes
const CAIRO_THEMES = [
  { name: 'zamalek', description: 'الزمالك (Zamalek) · آرت ديكو وفخامة القصور النيلية الدبلوماسية (Belle Époque & Champagne Gold)' },
  { name: 'downtown', description: 'وسط البلد (Downtown) · عمارة الخديوي إسماعيل والحواف الهندسية الحادة (Khedivial Classical & Editorial Swiss)' },
  { name: 'heliopolis', description: 'هليوبوليس (Heliopolis) · طراز البارون إمبان ومصر الجديدة الدافئة (Sandstone Terraces & Neo-Pharaonic)' },
  { name: 'maadi', description: 'المعادي (Maadi) · ضاحية الأشجار والهدوء العضوي الانسيابي (Degla Limestone & Serene Botanical)' },
  { name: 'new-cairo', description: 'القاهرة الجديدة (New Cairo) · الحداثة التقنية والواجهات الزجاجية المينيمالية (Tech Monolith & Frosted Glass)' },
  { name: 'shubra', description: 'شبرا (Shubra) · النيو-بروتاليزم المصري الشعبي والدفء الاجتماعي (Industrial Copper & Communal Energy)' },
  { name: 'nubia', description: 'النوبة (Nubia) · التراكوتا المشمسة وهندسة الطمي النيلي الأصيل (Adobe Geometry & Nile Terracotta)' },
  { name: 'sinai', description: 'سيناء (Sinai) · الهندسة البدوية وأوبسيديان الجبال والنجوم (Bedouin Geometry & Desert Obsidian)' },
  { name: 'roxy', description: 'روكسي (Roxy) · نوستالجيا التسعينات وظلال النيون الحادة (Egyptian Y2K & Playful Retro)' },
  { name: 'sakakini', description: 'السكاكيني (Sakakini) · قصر السكاكيني وفخامة الروكوكو والدراما المعمارية (Rococo Palace & High Drama)' },
  { name: 'garden-city', description: 'جاردن سيتي (Garden City) · الشوارع المنحنية والكلاسيكية الإنجليزية (Belle Époque & Soft Jade)' },
  { name: 'el-hussein', description: 'الحسين (El Hussein) · القاهرة الفاطمية والتراث الإسلامي العريق (Fatimid Gold & Islamic Geometry)' },
  { name: 'cairo-azure', description: 'أزرق القاهرة (Cairo Azure) · زرقة الغسق النيلي واللازورد الملكي (Nile Dusk Reflection & Cobalt)' },
  { name: 'luxury-gold', description: 'الذهب الفاخر (Luxury Gold) · هيبة الذهب الملكي الفرعوني والأسطح الداكنة (Pharaonic Gold & Obsidian)' }
];

// Simple YAML parser for contract attributes
function parseContract(content) {
  const lines = content.replace(/\r/g, '').split('\n');
  const data = {
    id: '',
    name: '',
    category: '',
    purpose: '',
    variants: [],
    tones: [],
    sizes: [],
    shapes: [],
    states: [],
    slots: []
  };

  let currentSection = '';

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Top-level scalar keys
    const topMatch = line.match(/^([a-zA-Z0-9_\-]+):\s*(.*)$/);
    if (topMatch && !line.startsWith(' ') && !line.startsWith('\t')) {
      currentSection = topMatch[1];
      const val = topMatch[2].trim();
      if (val && !val.startsWith('>') && !val.startsWith('|')) {
        data[currentSection] = val.replace(/^["']|["']$/g, '');
      }
      continue;
    }

    // Sub-items indented by 2 spaces
    if (line.startsWith('  ') && !line.startsWith('    ')) {
      const subMatch = line.trim().match(/^([a-zA-Z0-9_\-]+):?/);
      if (subMatch) {
        const itemKey = subMatch[1];
        if (currentSection === 'variants') data.variants.push(itemKey);
        else if (currentSection === 'tones') data.tones.push(itemKey);
        else if (currentSection === 'sizes') data.sizes.push(itemKey);
        else if (currentSection === 'shapes') data.shapes.push(itemKey);
        else if (currentSection === 'slots') data.slots.push(itemKey);
      } else if (line.trim().startsWith('- ')) {
        const itemVal = line.trim().substring(2).trim().replace(/^["']|["']$/g, '');
        if (currentSection === 'states') data.states.push(itemVal);
      }
    }
  }

  return data;
}

function generateHtmlData(options = { quiet: false }) {
  if (!fs.existsSync(CONTRACTS_DIR)) {
    throw new Error(`Contracts directory not found: ${CONTRACTS_DIR}`);
  }

  const contractFiles = fs.readdirSync(CONTRACTS_DIR).filter(f => f.endsWith('.yaml'));
  const tags = [];

  for (const file of contractFiles) {
    const filePath = path.join(CONTRACTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const contract = parseContract(content);

    const compId = contract.id || file.replace('.yaml', '').toLowerCase();
    const tagName = `qhr-${compId}`;
    const compName = contract.name || compId;

    const attributes = [];

    // 1. Variant attribute
    if (contract.variants.length > 0) {
      attributes.push({
        name: 'variant',
        description: `النمط البصري المعياري لمكون ${compName} (Variant)`,
        values: contract.variants.map(v => ({
          name: v,
          description: `Variant: ${v}`
        }))
      });
    }

    // 2. Size attribute
    if (contract.sizes.length > 0) {
      attributes.push({
        name: 'size',
        description: `الحجم المعياري لمكون ${compName} (Size: xs | sm | md | lg | xl)`,
        values: contract.sizes.map(s => ({
          name: s,
          description: `Size: ${s}`
        }))
      });
    }

    // 3. Tone attribute
    if (contract.tones.length > 0) {
      attributes.push({
        name: 'tone',
        description: `النبرة الدلالية لمكون ${compName} (Tone: neutral | primary | success | warning | danger | info)`,
        values: contract.tones.map(t => ({
          name: t,
          description: `Tone: ${t}`
        }))
      });
    }

    // 4. Shape attribute
    if (contract.shapes.length > 0) {
      attributes.push({
        name: 'shape',
        description: `الشكل الهندسي لمكون ${compName} (Shape: default | rounded | flat | circle)`,
        values: contract.shapes.map(sh => ({
          name: sh,
          description: `Shape: ${sh}`
        }))
      });
    }

    // 5. State attribute
    if (contract.states.length > 0) {
      attributes.push({
        name: 'state',
        description: `الحالة التفاعلية لمكون ${compName} (State)`,
        values: contract.states.map(st => ({
          name: st,
          description: `State: ${st}`
        }))
      });
    }

    // Standard attributes
    attributes.push({
      name: 'elevation',
      description: 'مستوى الارتفاع والظل لمكون قاهرة (none | xs | sm | md | lg | xl | cartouche | book)',
      values: [
        { name: 'none', description: 'بدون ظل' },
        { name: 'xs', description: 'ظل دقيق' },
        { name: 'sm', description: 'ظل خفيف' },
        { name: 'md', description: 'ظل قياسي' },
        { name: 'lg', description: 'ظل مرتفع' },
        { name: 'xl', description: 'ظل طافٍ' },
        { name: 'cartouche', description: 'ظل الخرطوشة الفرعونية المذهبة' },
        { name: 'book', description: 'ظل المخطوطة التحريرية العميقة' }
      ]
    });

    const markdownDoc = [
      `### 🏛️ \`<${tagName}>\``,
      `**مكون قاهرة المعماري الأصيل** · \`${compName}\` (${contract.category || 'Components'})`,
      `\n> **الغرض والوظيفة:** ${contract.purpose || 'مكون ويب معياري مستقل (Autonomous Web Component)'}`,
      `\n- **العقد الدلالي:** \`contracts/components/${file}\``,
      `\n\`\`\`html\n<${tagName}${contract.variants.length ? ` variant="${contract.variants[0]}"` : ''}${contract.sizes.length ? ` size="md"` : ''}>\n  محتوى المكون\n</${tagName}>\n\`\`\``,
      `\n---\n*Qahera UI Kit v1.5.4 · Sovereign Egyptian Design System by Alwkala*`
    ].join('\n');

    tags.push({
      name: tagName,
      description: markdownDoc,
      attributes,
      references: [
        {
          name: 'Qahera Documentation',
          url: `https://qahera.alwkala.com/docs/components`
        },
        {
          name: 'Component Contract',
          url: `https://github.com/alwkala/Qahera-UI-Kit/blob/main/contracts/components/${file}`
        }
      ]
    });
  }

  // Sort tags alphabetically
  tags.sort((a, b) => a.name.localeCompare(b.name));

  const globalAttributes = [
    {
      name: 'data-theme',
      description: 'أطلس أحياء القاهرة المعماري الـ 13 لتبديل الهوية البصرية والثقافية اللحظية (QAHERA-THEME-001)',
      values: CAIRO_THEMES,
      references: [
        {
          name: 'Cairo Thematic Topography',
          url: 'https://qahera.alwkala.com/studio/'
        }
      ]
    },
    {
      name: 'data-mode',
      description: 'وضع التباين الضوئي لمنظومة قاهرة المعمارية (Dual-Mode: Light / Dark)',
      values: [
        { name: 'light', description: 'نمط النهار (Day Mode) · تباين ناصع وسطوع متزن' },
        { name: 'dark', description: 'نمط الليل (Night Mode) · أسطح أوبسيديان داكنة وظلال ناعمة' }
      ]
    },
    {
      name: 'dir',
      description: 'اتجاه تدفق الواجهة والتحكم ثنائي الاتجاه المبني كبنية تحتية (RTL / LTR)',
      values: [
        { name: 'rtl', description: 'الاتجاه العربي الأصيل من اليمين لليسار (Right-to-Left)' },
        { name: 'ltr', description: 'الاتجاه الإنجليزي من اليسار لليمين (Left-to-Right)' }
      ]
    }
  ];

  const htmlDataSchema = {
    $schema: 'https://raw.githubusercontent.com/microsoft/vscode-html-languageservice/main/docs/customData.schema.json',
    version: 1.1,
    globalAttributes,
    tags
  };

  const jsonContent = JSON.stringify(htmlDataSchema, null, 2) + '\n';

  // 1. Write to upstream repo root
  fs.writeFileSync(OUTPUT_ROOT, jsonContent, 'utf8');

  // 2. Write to upstream dist/
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_DIST, jsonContent, 'utf8');

  // 3. Write to downstream website if exists
  let downstreamSynced = false;
  if (fs.existsSync(DOWNSTREAM_DIR)) {
    fs.writeFileSync(DOWNSTREAM_ROOT, jsonContent, 'utf8');
    const downstreamDistDir = path.join(DOWNSTREAM_DIR, 'dist');
    if (fs.existsSync(downstreamDistDir)) {
      fs.writeFileSync(DOWNSTREAM_DIST, jsonContent, 'utf8');
    }
    downstreamSynced = true;
  }

  const kbSize = (Buffer.byteLength(jsonContent, 'utf8') / 1024).toFixed(2);

  if (!options.quiet) {
    console.log(`\n🔮 QAHERA HTML CUSTOM DATA GENERATOR`);
    console.log(`──────────────────────────────────────────────────────`);
    console.log(`  ✓ Processed ${tags.length} canonical Web Components (<qhr-*>)`);
    console.log(`  ✓ Generated 3 Global Attributes (data-theme, data-mode, dir) with 13 Cairo themes`);
    console.log(`  ✓ Emitted: qahera.html-data.json (${kbSize} KB)`);
    console.log(`  ✓ Emitted: dist/qahera.html-data.json`);
    if (downstreamSynced) {
      console.log(`  ✓ Synchronized to downstream site: ${DOWNSTREAM_ROOT}`);
      console.log(`  ✓ Synchronized to downstream dist: ${DOWNSTREAM_DIST}`);
    }
    console.log(`──────────────────────────────────────────────────────\n`);
  }

  return {
    tagsCount: tags.length,
    kbSize,
    outputPath: OUTPUT_ROOT
  };
}

if (require.main === module) {
  generateHtmlData();
}

module.exports = { generateHtmlData };
