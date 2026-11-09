@AGENTS.md

## Claude Code extras

- Each step of a contribution has a skill in `.claude/skills/`. Use them in this order: `start-change` → `preview-locally` → `design-review` → `explain-diff` → `finish-work` → `create-pr` → `address-review`. When the user is on `main` and asks for a change, start with `start-change`.
- The Storybook MCP server (`.mcp.json`) works only while `pnpm storybook` is running.
