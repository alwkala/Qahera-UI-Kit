# 10. MCP-SPEC: Model Context Protocol (MCP) & Agent Skills Interface

**Status:** Canonical Subordinate Specification  
**Authority:** QAHERA-SPEC §41  
**Milestone:** v2.0.0 (Autonomous AI Agent Engine)

---

## 1. Role of Qahera MCP Server

The native Qahera MCP server (`qahera-mcp`) acts as an ultra-low latency, token-efficient semantic search and inspection gateway for AI agents (Claude Code, Antigravity IDE, Cursor, Windsurf, Copilot).

### Tool Endpoints Contract (JSON-RPC 2.0)

* `qahera_search_components(query: string, category?: string)`: Fast semantic lookup across all 42 canonical components and 20 patterns.
* `qahera_inspect_component(name: string, level: 0|1|2|3|4)`: Returns progressive component context:
  - `Level 0`: Component summary and category.
  - `Level 1`: AI decision metadata (`purpose`, `use_when`, `avoid_when`).
  - `Level 2`: Full YAML recipe (`recipes/<name>.yaml`).
  - `Level 3`: Target renderer source (HTML, React, PHP, JS, HTMX).
  - `Level 4`: Verified production examples.
* `qahera_inspect_tokens(category?: string, theme?: string)`: Retrieves token scales, contrast ratios, and neighborhood theme overrides.
* `qahera_validate_recipe(recipe_yaml: string)`: Validates a proposed component recipe against `recipe.schema.yaml`.
* `qahera_generate_snippet(component: string, target: "html"|"php"|"htmx"|"react"|"js", props?: object)`: Returns machine-guaranteed code snippets adhering strictly to zero vocabulary drift.

---

## 2. Global Distribution & Registry Listing

Qahera UI Kit's AI agent interfaces are distributed across premier global registries:

### Model Context Protocol Registries
* **[mcpservers.org](https://mcpservers.org/)**: The authoritative open registry for MCP servers.
* **[Smithery.ai](https://smithery.ai/)**: One-click install command (`npx -y @smithery/cli install @alwkala/qahera-mcp`).
* **[Glama.ai](https://glama.ai/mcp/servers)**: Curated agent tool directory and health telemetry.
* **[PulseMCP](https://pulsemcp.com/)**: Real-time index and performance tracking.

### Agent Skills Registries
* **[skills.sh](https://www.skills.sh/)**: Premier universal registry for AI agent skills across Claude, Cursor, Windsurf, and Antigravity.
* **TidyFactor Brain**: Sovereign workspace switcher and local MCP integration.
