import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const issues = {
  critical: [],
  warnings: [],
  info: []
};

// Check for images without alt text
function checkAltText(file, content) {
  const imgMatches = content.matchAll(/<img[^>]*>/g);
  for (const match of imgMatches) {
    const imgTag = match[0];
    if (!imgTag.includes('alt=')) {
      issues.critical.push(`${file}: Image without alt text: ${imgTag.substring(0, 80)}...`);
    }
  }
}

// Check for missing keys in map operations
function checkKeys(file, content) {
  const mapMatches = content.matchAll(/\.map\([^)]+\)/gs);
  for (const match of mapMatches) {
    const mapCode = match[0];
    if (!mapCode.includes('key=')) {
      issues.warnings.push(`${file}: Possible missing key in map: ${mapCode.substring(0, 80)}...`);
    }
  }
}

// Check for console.log statements
function checkConsoleLogs(file, content) {
  if (content.includes('console.log') || content.includes('console.error')) {
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('console.')) {
        issues.info.push(`${file}:${idx + 1}: Console statement found`);
      }
    });
  }
}

// Check for proper error handling
function checkErrorBoundaries(file, content) {
  if (file.includes('App.tsx') && !content.includes('ErrorBoundary') && !content.includes('componentDidCatch')) {
    issues.warnings.push(`${file}: No error boundary detected in App component`);
  }
}

// Recursively check files
function checkDirectory(dir) {
  const files = readdirSync(dir);

  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
        checkDirectory(fullPath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js')) {
      const content = readFileSync(fullPath, 'utf-8');
      checkAltText(fullPath, content);
      checkKeys(fullPath, content);
      checkConsoleLogs(fullPath, content);
      checkErrorBoundaries(fullPath, content);
    }
  }
}

// Run audit
console.log('🔍 Running comprehensive site audit...\n');
checkDirectory('src');

// Report results
if (issues.critical.length > 0) {
  console.log('❌ CRITICAL ISSUES:');
  issues.critical.forEach(issue => console.log(`  ${issue}`));
  console.log();
}

if (issues.warnings.length > 0) {
  console.log('⚠️  WARNINGS:');
  issues.warnings.forEach(issue => console.log(`  ${issue}`));
  console.log();
}

if (issues.info.length > 0) {
  console.log('ℹ️  INFO:');
  issues.info.forEach(issue => console.log(`  ${issue}`));
  console.log();
}

if (issues.critical.length === 0 && issues.warnings.length === 0 && issues.info.length === 0) {
  console.log('✅ No issues found!');
} else {
  console.log(`\n📊 Summary: ${issues.critical.length} critical, ${issues.warnings.length} warnings, ${issues.info.length} info`);
}
