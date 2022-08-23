# nx-tsc

Nx executor to type-check project source files using tsc --noEmit

## Installation

```bash
npm install -D @webpro/nx-tsc
```

## Configuration

Add a `tsc` target to each `project.json`:

```json
{
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/my-lib/src",
  "targets": {
    "tsc": {
      "executor": "@webpro/nx-tsc:tsc",
      "options": {
        "tsConfig": ["tsconfig.json"]
      }
    }
  }
}
```

## Run type-checker

This enables the `tsc` target in the Nx workspace:

```bash
nx tsc my-lib
```
