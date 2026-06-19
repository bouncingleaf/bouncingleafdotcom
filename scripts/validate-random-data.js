#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const randomDir = path.join(__dirname, '..', 'src', 'data', 'random');
const files = fs
  .readdirSync(randomDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => path.join(randomDir, f));

let hadErrors = false;

for (const file of files) {
  console.log(`\n=== ${path.relative(process.cwd(), file)} ===`);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.log('JSON PARSE ERROR:', e.message);
    hadErrors = true;
    continue;
  }

  const { templates, variables } = data;
  const varNames = new Set(Object.keys(variables));
  const usedVars = new Set();
  const usedForms = {}; // varName -> Set of forms used

  const allTexts = [];
  for (const t of templates) allTexts.push(['template', t]);
  for (const [name, entries] of Object.entries(variables)) {
    for (const entry of entries) {
      if (typeof entry === 'string') {
        allTexts.push([`var ${name}`, entry]);
      } else if (typeof entry === 'object' && entry !== null) {
        if ('$ref' in entry) continue;
        for (const [k, v] of Object.entries(entry)) {
          if (typeof v === 'string') allTexts.push([`var ${name}.${k}`, v]);
        }
      }
    }
  }

  for (const [ctx, text] of allTexts) {
    const opens = (text.match(/\{\{/g) || []).length;
    const closes = (text.match(/\}\}/g) || []).length;
    if (opens !== closes) {
      console.log(`UNBALANCED BRACES in ${ctx}: "${text}"`);
      hadErrors = true;
    }
    const singleBraceIssues = text.match(
      /\{(?!\{)[A-Z_]+\}(?!\})|\{\{[A-Z_]+\}(?!\})/g
    );
    if (singleBraceIssues) {
      console.log(
        `POSSIBLE MALFORMED BRACES in ${ctx}: "${text}" ->`,
        singleBraceIssues
      );
      hadErrors = true;
    }
  }

  const refRegex = /\{\{([^}]*)\}\}/g;
  for (const [ctx, text] of allTexts) {
    let m;
    while ((m = refRegex.exec(text))) {
      const inner = m[1];
      const validRef = /^(\w+)(?::(\w+))?$/.exec(inner);
      if (!validRef) {
        console.log(
          `UNRECOGNIZED MODIFIER/SYNTAX in ${ctx}: "{{${inner}}}" (in "${text}")`
        );
        hadErrors = true;
        continue;
      }
      const [, varName, form] = validRef;
      usedVars.add(varName);
      if (!varNames.has(varName)) {
        console.log(
          `UNDEFINED VARIABLE "${varName}" referenced in ${ctx}: "${text}"`
        );
        hadErrors = true;
      } else if (form) {
        if (!usedForms[varName]) usedForms[varName] = new Set();
        usedForms[varName].add(form);
      }
    }
  }

  for (const [varName, forms] of Object.entries(usedForms)) {
    const entries = variables[varName] || [];
    const objectEntries = entries.filter(
      (e) => typeof e === 'object' && e !== null && !('$ref' in e)
    );
    if (objectEntries.length === 0) continue;
    for (const form of forms) {
      const hasForm = objectEntries.some((e) => form in e);
      if (!hasForm) {
        console.log(
          `FORM ":${form}" used for "${varName}" but no entry defines key "${form}" (entries: ${JSON.stringify(objectEntries)})`
        );
        hadErrors = true;
      }
    }
  }
  for (const [varName, forms] of Object.entries(usedForms)) {
    const entries = variables[varName] || [];
    const hasAnyObject = entries.some((e) => typeof e === 'object' && e !== null);
    if (!hasAnyObject) {
      console.log(
        `FORM(S) ${[...forms].join(',')} used for "${varName}" but all its entries are plain strings (form has no effect)`
      );
      hadErrors = true;
    }
  }

  for (const name of varNames) {
    if (!usedVars.has(name)) {
      console.log(`UNUSED VARIABLE: "${name}" is defined but never referenced`);
      hadErrors = true;
    }
  }

  for (const [name, entries] of Object.entries(variables)) {
    for (const entry of entries) {
      if (typeof entry === 'object' && entry !== null && '$ref' in entry) {
        if (!varNames.has(entry.$ref)) {
          console.log(
            `BROKEN $ref: "${name}" references undefined variable "${entry.$ref}"`
          );
          hadErrors = true;
        } else {
          usedVars.add(entry.$ref);
        }
      }
    }
  }
}

if (!hadErrors) {
  console.log('\nNo issues found.');
}

process.exit(hadErrors ? 1 : 0);
