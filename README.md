# LPG-typescript-runtime

TypeScript/JavaScript runtime for [LPG2](https://github.com/A-LPG/LPG2).

## Install / coordinates

| Field | Value |
|-------|-------|
| Package | npm [`lpg2ts`](https://www.npmjs.com/package/lpg2ts) |
| Version | 0.0.11 |
| Compatible generator | LPG2 ≥ 2.3.0 — see [`ecosystem/compat.json`](https://github.com/A-LPG/LPG2/blob/main/ecosystem/compat.json) |

```bash
npm install lpg2ts
```

## Minimum toolchain

Node.js 18+.

## Build and test

```bash
cd lpg2ts
npm install
npm run build
```

## Wiring generated files

1. Generate with `-programming_language=typescript -table` and `dtParserTemplateF.gi`
2. Import generated parser alongside `lpg2ts`
3. See [calculator TypeScript sample](https://github.com/A-LPG/LPG2/tree/main/examples/calculator/typescript)

## Features

| Feature | Status |
|---------|--------|
| Deterministic parser | yes |
| Backtracking | yes |
| Nested automatic AST | yes |
| `%Recover` prosthetic AST | yes |

## Publish status

- Channel: npm
- Automation: `.github/workflows/publish.yml` (requires `NPM_TOKEN`)

## Links

- Generator: https://github.com/A-LPG/LPG2
- Ecosystem: https://github.com/A-LPG/LPG2/blob/main/docs/ECOSYSTEM.md
