import { useState, useCallback } from 'react'
import headlinesData from '../data/headlines.json'

type VariableRef = { $ref: string }
type VariableValue = string | Record<string, string> | VariableRef

interface HeadlinesData {
  templates: string[]
  variables: Record<string, VariableValue[]>
}

const data = headlinesData as HeadlinesData

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function flattenVariable(
  varName: string,
  variables: Record<string, VariableValue[]>,
  depth = 0
): (string | Record<string, string>)[] {
  if (depth > 5) return []
  return (variables[varName] ?? []).flatMap((v) => {
    if (typeof v === 'object' && '$ref' in v) {
      return flattenVariable((v as VariableRef).$ref, variables, depth + 1)
    }
    return [v as string | Record<string, string>]
  })
}

function resolveVariable(
  varName: string,
  form: string | null,
  variables: Record<string, VariableValue[]>
): string {
  const flattened = flattenVariable(varName, variables)
  if (flattened.length === 0) return `{{${varName}}}`
  const value = pick(flattened)
  if (typeof value === 'string') return value
  const key = form ?? 'default'
  return value[key] ?? value['default'] ?? Object.values(value)[0] ?? ''
}

function generateHeadline(
  template: string,
  variables: Record<string, VariableValue[]>
): string {
  let result = template
  for (let i = 0; i < 5; i++) {
    const next = result.replace(
      /\{\{(\w+)(?::(\w+))?\}\}/g,
      (_, varName, form) => resolveVariable(varName, form ?? null, variables)
    )
    if (next === result) break
    result = next
  }
  return result.charAt(0).toUpperCase() + result.slice(1)
}

const BATCH_SIZE = 10

function generateBatch(): string[] {
  return Array.from({ length: BATCH_SIZE }, () =>
    generateHeadline(pick(data.templates), data.variables)
  )
}

export default function Headlines() {
  const [headlines, setHeadlines] = useState<string[]>(() => generateBatch())

  const handleGenerate = useCallback(() => {
    setHeadlines(generateBatch())
  }, [])

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-8">Clickbait Headline Generator</h1>

      <div className="max-w-2xl space-y-6">
        <ol className="space-y-4">
          {headlines.map((headline, i) => (
            <li
              key={i}
              className="p-4 bg-gray-50 border border-gray-200 rounded text-gray-800 leading-snug"
            >
              {headline}
            </li>
          ))}
        </ol>

        <button
          onClick={handleGenerate}
          className="px-6 py-2 bg-accent-primary text-white rounded hover:opacity-90 transition-opacity font-medium"
        >
          Generate
        </button>
      </div>
    </div>
  )
}
