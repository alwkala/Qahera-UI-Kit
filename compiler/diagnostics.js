/**
 * Qahera UI Kit — Machine-Readable Diagnostics System
 * 
 * Provides structured, machine-actionable diagnostics for AI agents, CI, and developers.
 * 
 * Diagnostic Item Contract:
 * {
 *   code: "QAHERA-CONTRACT-004",
 *   level: "error" | "warning" | "info",
 *   message: "Detailed description of violation",
 *   file: "contracts/components/button.yaml",
 *   path: "variants.primary",
 *   line: 18,
 *   column: 5,
 *   suggestion: "Actionable fix suggestion"
 * }
 */

'use strict';

class Diagnostics {
  constructor() {
    this.items = [];
  }

  add(level, code, message, file = null, pathValue = null, line = null, column = null, suggestion = null) {
    this.items.push({
      code,
      level,
      message,
      file: file ? file.replace(/\\/g, '/') : null,
      path: pathValue,
      line,
      column,
      suggestion,
    });
  }

  error(code, message, file = null, pathValue = null, line = null, column = null, suggestion = null) {
    this.add('error', code, message, file, pathValue, line, column, suggestion);
  }

  warn(code, message, file = null, pathValue = null, line = null, column = null, suggestion = null) {
    this.add('warning', code, message, file, pathValue, line, column, suggestion);
  }

  info(code, message, file = null, pathValue = null, line = null, column = null, suggestion = null) {
    this.add('info', code, message, file, pathValue, line, column, suggestion);
  }

  hasErrors() {
    return this.items.some(item => item.level === 'error');
  }

  hasWarnings() {
    return this.items.some(item => item.level === 'warning');
  }

  count(level) {
    return this.items.filter(item => item.level === level).length;
  }

  // Deterministically sorted items by file, line, code
  getSortedItems() {
    return [...this.items].sort((a, b) => {
      const fileCompare = (a.file || '').localeCompare(b.file || '');
      if (fileCompare !== 0) return fileCompare;
      const lineCompare = (a.line || 0) - (b.line || 0);
      if (lineCompare !== 0) return lineCompare;
      return a.code.localeCompare(b.code);
    });
  }

  toJSON() {
    const sorted = this.getSortedItems();
    return {
      schema: 'qahera.diagnostics/v1',
      summary: {
        errors: this.count('error'),
        warnings: this.count('warning'),
        info: this.count('info'),
        total: this.items.length,
      },
      items: sorted,
    };
  }

  renderTerminal() {
    const lines = [];
    const sorted = this.getSortedItems();

    const errors = sorted.filter(i => i.level === 'error');
    const warnings = sorted.filter(i => i.level === 'warning');
    const infos = sorted.filter(i => i.level === 'info');

    if (errors.length > 0) {
      lines.push('\n🚨 Errors:');
      for (const err of errors) {
        const loc = err.line ? `:${err.line}:${err.column || 1}` : '';
        const target = err.file ? ` [${err.file}${loc}]` : '';
        lines.push(`  ✕ [${err.code}]${target} ${err.message}`);
        if (err.path) lines.push(`    Path: ${err.path}`);
        if (err.suggestion) lines.push(`    Suggestion: ${err.suggestion}`);
      }
    }

    if (warnings.length > 0) {
      lines.push('\n⚠️  Warnings:');
      for (const warn of warnings) {
        const loc = warn.line ? `:${warn.line}:${warn.column || 1}` : '';
        const target = warn.file ? ` [${warn.file}${loc}]` : '';
        lines.push(`  ! [${warn.code}]${target} ${warn.message}`);
        if (warn.path) lines.push(`    Path: ${warn.path}`);
        if (warn.suggestion) lines.push(`    Suggestion: ${warn.suggestion}`);
      }
    }

    if (infos.length > 0) {
      lines.push('\nℹ️  Information:');
      for (const info of infos) {
        lines.push(`  • [${info.code}] ${info.message}`);
      }
    }

    return lines.join('\n');
  }
}

module.exports = {
  Diagnostics,
};
