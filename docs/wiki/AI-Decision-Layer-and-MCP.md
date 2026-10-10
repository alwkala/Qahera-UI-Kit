# AI Decision Layer & Native MCP Server

Qahera UI Kit is engineered specifically for AI coding agents (Google Antigravity, Claude Code, Cursor, Windsurf). Rather than forcing LLMs to guess styling through statistical hallucination, Qahera provides an authoritative machine-readable contract layer.

---

## The Sovereign Model Context Protocol (MCP) Server

Shipped natively in `v1.7.0` with **zero external dependencies**:

```bash
# Launch Stdio server (JSON-RPC 2.0)
npx -y qahera-ui mcp

# Launch HTTP server on custom port
npx -y qahera-ui mcp --http --port=3301
```

### The 7 Canonical AI Tools

```
               ┌────────────────────────────────────────────────────────┐
               │           QAHERA MODEL CONTEXT PROTOCOL (MCP)          │
               └───────────────────────────┬────────────────────────────┘
                                           │
         ┌───────────────────┬─────────────┴───────┬───────────────────┐
         ▼                   ▼                     ▼                   ▼
   [ Discovery ]       [ Contracts ]          [ Tokens ]         [ Governance ]
   • qahera_list       • qahera_get_component • qahera_search_tokens • qahera_audit_code
   • qahera_get_theme  • qahera_get_pattern   • qahera_compose_screen
```

| Tool | Parameters | Output & Purpose |
|---|---|---|
| `qahera_list` | `category` (`components`, `patterns`, `templates`, `themes`) | Returns authoritative catalog array with IDs and metadata. |
| `qahera_get_component` | `name`, `target` (`react`, `php`, `html`, `htmx`, `js`) | Returns contract YAML, recipe, and implementation code. |
| `qahera_search_tokens` | `query`, `category` | Searches 335+ `--qhr-*` design tokens by semantic role or color. |
| `qahera_get_pattern` | `name` | Returns higher-order UX pattern requirements and composite component tree. |
| `qahera_get_theme` | `name` | Returns Cairo neighborhood theme token overrides and cultural narrative. |
| `qahera_audit_code` | `code`, `framework` | Deterministically audits code against Zero-Custom-CSS, emoji bans, and font rules. |
| `qahera_compose_screen` | `screen_type`, `theme`, `target` | Generates a complete screen layout composed exclusively of verified `qhr-*` items. |

---

## Editor & Agent Integration

Run the zero-touch configurator:
```bash
npx qahera-ui setup-ide
```

### 1. Cursor IDE Configuration (`.cursor/mcp.json`)
```json
{
  "mcpServers": {
    "qahera": {
      "command": "node",
      "args": ["cli/mcp-server.js"]
    }
  }
}
```

### 2. Claude Desktop Configuration
Add to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "qahera-ui": {
      "command": "npx",
      "args": ["-y", "qahera-ui", "mcp"]
    }
  }
}
```

### 3. Google Antigravity IDE Configuration
Antigravity discovers Qahera automatically via `.agents/skills/qahera-ui/SKILL.md` and reads `qahera.css-data.json` and `qahera.html-data.json` for smart autocomplete.

---

## Remote Web MCP Endpoint

For web agents, continuous integration, or decoupled cloud environments:
* **URL:** `https://alwkala.com/qahera/api/mcp.php`
* **Protocol:** JSON-RPC 2.0 over HTTP POST
* **Rate Limit:** 60 requests/minute with 64KB read-only payload protection
