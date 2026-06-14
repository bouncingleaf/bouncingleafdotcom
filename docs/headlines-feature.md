# Clickbait Headline Generator — Requirements & Notes

## Overview

An unlisted page at `/headlines` that generates fake clickbait headlines from configurable templates and variable word lists.

## Functional Requirements

### Generation
- Displays 5 headlines at a time
- A "Generate" button regenerates all 5 headlines with new random picks
- Headlines are also generated on initial page load
- Each slot in a template picks independently — the same variable appearing twice in one template can resolve to different values both times

### Template Format
Templates are strings stored in `src/data/headlines.json` under the `templates` key. Variables are written as `{{VARIABLE}}` or `{{VARIABLE:form}}`.

Examples:
```
{{NUMBER}} things about {{TOPIC}} that {{EXPERT:plural}} say you should know -- number {{NUMBER}} will surprise you!
```

### Variable Values
Each variable name maps to an array of possible values. Values can be:
- A plain string: `"science"`
- An object with named forms: `{ "default": "doctor", "plural": "doctors" }`

The `{{VARIABLE}}` syntax uses the `default` form (or the string itself). `{{VARIABLE:formname}}` looks up the named key in the value object.

Form names are defined by the template author — there is no fixed set. Common conventions in the seed data: `plural` for nouns, `s` / `ing` for verb conjugations.

### Data File
`src/data/headlines.json` — edit this file to add templates, variables, or word lists.

```json
{
  "templates": [ "..." ],
  "variables": {
    "NUMBER": ["5", "10", "17"],
    "TOPIC": ["your health", "dogs"],
    "EXPERT": [
      { "default": "doctor", "plural": "doctors" },
      { "default": "child", "plural": "children" }
    ]
  }
}
```

## Future Enhancements

### Weights
Allow templates and variable values to carry an optional `weight` number so some entries appear more or less often than others.

Proposed format:
```json
{ "default": "doctor", "plural": "doctors", "weight": 3 }
```

### Copy to Clipboard
A small copy button per headline so the user can grab one without selecting text manually.

### Distinct templates per batch
Option to guarantee no two headlines in the same batch use the same template.

### In-browser editing
A hidden UI for adding/editing templates and word list entries without touching the JSON file directly.

### Shareable links
A URL param that encodes the current set of headlines so they can be shared (e.g. `?seed=abc123`).
