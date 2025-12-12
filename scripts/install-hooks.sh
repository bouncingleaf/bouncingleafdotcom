#!/bin/bash

# Install git hooks from .githooks directory
# This script copies the pre-commit hook to .git/hooks/ and makes it executable

echo "Installing git hooks..."

# Copy pre-commit hook
cp .githooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "✅ Pre-commit hook installed!"
echo ""
echo "The hook will now run automatically before each commit to:"
echo "  - Check code formatting (Prettier)"
echo "  - Run linting (ESLint)"
echo "  - Check types (TypeScript)"
echo "  - Process new images and update gallery.json"
echo ""
echo "To bypass the hook (not recommended), use: git commit --no-verify"
