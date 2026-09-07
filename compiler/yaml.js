/**
 * Qahera UI Kit — Deterministic YAML Subset Parser
 * 
 * "Qahera YAML is not full YAML. It is a Qahera DSL serialized using a YAML-like syntax."
 * 
 * Supported:
 * - Nested indentation-based objects
 * - Arrays (- item)
 * - Scalar values (strings, numbers, booleans, null)
 * - Quoted strings ("...", '...')
 * - Inline arrays ([a, b, c])
 * - Inline objects ({key: val})
 * - Comments (# ...)
 * 
 * Explicitly Rejected with QAHERA-YAML-012:
 * - Anchors (&name)
 * - Aliases (*name)
 * - Merge keys (<<:)
 * - Custom tags (!tag)
 * - Directives (%YAML)
 */

'use strict';

class YamlParseError extends Error {
  constructor(code, message, line, column, suggestion = null) {
    super(message);
    this.name = 'YamlParseError';
    this.code = code;
    this.line = line;
    this.column = column;
    this.suggestion = suggestion;
  }
}

function stripComment(line, lineNum) {
  let quote = null;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if ((char === '"' || char === "'") && !quote) {
      quote = char;
      continue;
    }

    if (char === quote) {
      quote = null;
      continue;
    }

    if (char === '#' && !quote) {
      return line.slice(0, i).trimEnd();
    }
  }

  return line;
}

function checkUnsupportedFeatures(line, lineNum) {
  const trimmed = line.trim();

  // Anchors (&...)
  if (/(?:^|\s)&[a-zA-Z0-9_-]+/.test(trimmed)) {
    throw new YamlParseError(
      'QAHERA-YAML-012',
      'Unsupported YAML feature: Anchor (&). Qahera YAML intentionally supports a deterministic subset.',
      lineNum,
      line.indexOf('&') + 1,
      'Remove anchor references and define values explicitly.'
    );
  }

  // Aliases (*...)
  if (/(?:^|\s)\*[a-zA-Z0-9_-]+/.test(trimmed)) {
    throw new YamlParseError(
      'QAHERA-YAML-012',
      'Unsupported YAML feature: Alias (*). Qahera YAML intentionally supports a deterministic subset.',
      lineNum,
      line.indexOf('*') + 1,
      'Specify the value directly instead of referencing an alias.'
    );
  }

  // Merge keys (<<:)
  if (/^<<\s*:/.test(trimmed)) {
    throw new YamlParseError(
      'QAHERA-YAML-012',
      'Unsupported YAML feature: Merge key (<<). Qahera YAML intentionally supports a deterministic subset.',
      lineNum,
      line.indexOf('<<') + 1,
      'Duplicate the required properties explicitly or use inheritance via "extends".'
    );
  }

  // Custom tags (!...)
  if (/(?:^|\s)![a-zA-Z0-9_!/-]+/.test(trimmed)) {
    throw new YamlParseError(
      'QAHERA-YAML-012',
      'Unsupported YAML feature: Custom tag (!). Qahera YAML intentionally supports a deterministic subset.',
      lineNum,
      line.indexOf('!') + 1,
      'Remove the custom tag and serialize data using standard primitives.'
    );
  }

  // Directives (%...)
  if (/^%[A-Z]+/.test(trimmed)) {
    throw new YamlParseError(
      'QAHERA-YAML-012',
      'Unsupported YAML feature: Directive (%). Qahera YAML intentionally supports a deterministic subset.',
      lineNum,
      line.indexOf('%') + 1,
      'Remove document directives from Qahera definitions.'
    );
  }
}

function getIndentation(line) {
  const match = line.match(/^ */);
  return match ? match[0].length : 0;
}

function parseScalar(value, lineNum, colNum) {
  const trimmed = value.trim();

  if (trimmed === '') return null;
  if (trimmed === 'null' || trimmed === '~') return null;
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;

  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  // Inline array: [a, b, c]
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map((item, idx) => parseScalar(item.trim(), lineNum, colNum + idx));
  }

  // Inline object: {a: 1, b: 2}
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    const inner = trimmed.slice(1, -1).trim();
    const result = {};
    if (!inner) return result;

    const parts = [];
    let currentPart = '';
    let bracketDepth = 0;
    let braceDepth = 0;
    for (let i = 0; i < inner.length; i++) {
      const char = inner[i];
      if (char === '[') bracketDepth++;
      else if (char === ']') bracketDepth--;
      else if (char === '{') braceDepth++;
      else if (char === '}') braceDepth--;

      if (char === ',' && bracketDepth === 0 && braceDepth === 0) {
        parts.push(currentPart);
        currentPart = '';
      } else {
        currentPart += char;
      }
    }
    if (currentPart.trim()) parts.push(currentPart);

    for (const part of parts) {
      const colon = part.indexOf(':');
      if (colon === -1) {
        throw new YamlParseError(
          'QAHERA-YAML-003',
          `Invalid inline object syntax: ${trimmed}`,
          lineNum,
          colNum,
          'Ensure key: value pairs are separated by colons and commas.'
        );
      }
      const key = part.slice(0, colon).trim();
      const val = part.slice(colon + 1).trim();
      result[key] = parseScalar(val, lineNum, colNum);
    }
    return result;
  }

  return trimmed;
}

function parseYaml(content, filePath = 'unknown') {
  const rawLines = content.split(/\r?\n/);
  const parsedLines = [];

  for (let i = 0; i < rawLines.length; i++) {
    const lineNum = i + 1;
    const rawLine = rawLines[i];
    const stripped = stripComment(rawLine, lineNum);

    if (stripped.trim() === '') continue;

    checkUnsupportedFeatures(stripped, lineNum);

    parsedLines.push({
      text: stripped,
      lineNum,
      indent: getIndentation(stripped),
      trimmed: stripped.trim(),
    });
  }

  if (parsedLines.length === 0) return {};

  function parseBlock(startIndex, minIndent) {
    let mode = null; // 'array' | 'object'
    const objResult = {};
    const arrResult = [];
    let idx = startIndex;

    while (idx < parsedLines.length) {
      const current = parsedLines[idx];

      if (current.indent < minIndent) break;

      if (current.indent > minIndent) {
        throw new YamlParseError(
          'QAHERA-YAML-002',
          `Unexpected indentation at line ${current.lineNum}: "${current.trimmed}"`,
          current.lineNum,
          current.indent + 1,
          `Expected indentation level of ${minIndent} spaces.`
        );
      }

      // Array item (- ...)
      if (current.trimmed.startsWith('- ')) {
        mode = 'array';
        const rawItem = current.trimmed.slice(2).trim();

        if (!rawItem) {
          // Block following empty hyphen
          const next = parsedLines[idx + 1];
          if (next && next.indent > current.indent) {
            const child = parseBlock(idx + 1, next.indent);
            arrResult.push(child.value);
            idx = child.nextIndex;
            continue;
          }
          arrResult.push(null);
          idx++;
          continue;
        }

        // Inline key-value in list item: - key: value
        if (rawItem.includes(':') && !rawItem.startsWith('{')) {
          const colon = rawItem.indexOf(':');
          const itemKey = rawItem.slice(0, colon).trim();
          const itemVal = rawItem.slice(colon + 1).trim();

          const itemObj = {};
          if (itemVal) {
            itemObj[itemKey] = parseScalar(itemVal, current.lineNum, current.indent + 2);
            let next = parsedLines[idx + 1];
            while (next && next.indent > current.indent && !next.trimmed.startsWith('- ')) {
              const nextColon = next.trimmed.indexOf(':');
              if (nextColon !== -1) {
                const k = next.trimmed.slice(0, nextColon).trim();
                const v = next.trimmed.slice(nextColon + 1).trim();
                itemObj[k] = parseScalar(v, next.lineNum, next.indent);
              }
              idx++;
              next = parsedLines[idx + 1];
            }
          } else {
            const next = parsedLines[idx + 1];
            if (next && next.indent > current.indent) {
              const child = parseBlock(idx + 1, next.indent);
              itemObj[itemKey] = child.value;
              arrResult.push(itemObj);
              idx = child.nextIndex;
              continue;
            } else {
              itemObj[itemKey] = null;
            }
          }
          arrResult.push(itemObj);
          idx++;
          continue;
        }

        arrResult.push(parseScalar(rawItem, current.lineNum, current.indent + 2));
        idx++;
        continue;
      }

      // Object key-value
      mode = 'object';
      const colon = current.trimmed.indexOf(':');

      if (colon === -1) {
        throw new YamlParseError(
          'QAHERA-YAML-001',
          `Malformed YAML line, missing colon at line ${current.lineNum}: "${current.trimmed}"`,
          current.lineNum,
          current.indent + 1,
          'Ensure every property follows the key: value syntax.'
        );
      }

      const key = current.trimmed.slice(0, colon).trim();
      const rawVal = current.trimmed.slice(colon + 1).trim();

      // Folded / Multiline indicator (> or |)
      if (rawVal === '>' || rawVal === '|') {
        let multiline = '';
        let mIdx = idx + 1;
        while (mIdx < parsedLines.length && parsedLines[mIdx].indent > current.indent) {
          multiline += (multiline ? ' ' : '') + parsedLines[mIdx].trimmed;
          mIdx++;
        }
        objResult[key] = multiline.trim();
        idx = mIdx;
        continue;
      }

      if (rawVal) {
        objResult[key] = parseScalar(rawVal, current.lineNum, current.indent + colon + 1);
        idx++;
        continue;
      }

      // Empty value -> check for nested block
      const next = parsedLines[idx + 1];
      if (next && next.indent > current.indent) {
        const child = parseBlock(idx + 1, next.indent);
        objResult[key] = child.value;
        idx = child.nextIndex;
        continue;
      }

      objResult[key] = null;
      idx++;
    }

    return {
      value: mode === 'array' ? arrResult : objResult,
      nextIndex: idx,
    };
  }

  return parseBlock(0, parsedLines[0].indent).value;
}

module.exports = {
  parseYaml,
  YamlParseError,
  parseScalar,
};
