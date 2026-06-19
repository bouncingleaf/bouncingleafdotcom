import { useState, useEffect } from 'react'

type VariableRef = { $ref: string }
type VariableValue = string | Record<string, string> | VariableRef

interface RandomData {
  name: string
  templates: string[]
  variables: Record<string, VariableValue[]>
}

const rawModules = import.meta.glob('../data/random/*.json', { eager: true })
const datasets = (Object.values(rawModules) as Array<{ default: RandomData }>)
  .map((m) => m.default)
  .sort((a, b) => a.name.localeCompare(b.name))

const COUNT_OPTIONS = [5, 10, 20]
const DEFAULT_COUNT = 5
const COOLDOWN_MS = 1000

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

function generate(data: RandomData): string {
  let result = pick(data.templates)
  for (let i = 0; i < 5; i++) {
    const next = result.replace(
      /\{\{(\w+)(?::(\w+))?\}\}/g,
      (_, varName, form) =>
        resolveVariable(varName, form ?? null, data.variables)
    )
    if (next === result) break
    result = next
  }
  return result.charAt(0).toUpperCase() + result.slice(1)
}

function generateBatch(data: RandomData, count: number): string[] {
  return Array.from({ length: count }, () => generate(data))
}

export default function Random() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [count, setCount] = useState(DEFAULT_COUNT)
  const [items, setItems] = useState<string[]>(() =>
    generateBatch(datasets[0], DEFAULT_COUNT)
  )
  const [cooling, setCooling] = useState(false)

  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  function triggerGenerate(dataIndex: number, newCount: number) {
    setItems(generateBatch(datasets[dataIndex], newCount))
    setCooling(true)
    setTimeout(() => setCooling(false), COOLDOWN_MS)
  }

  function handleDatasetChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const idx = Number(e.target.value)
    setSelectedIndex(idx)
    triggerGenerate(idx, count)
  }

  function handleCountChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newCount = Number(e.target.value)
    setCount(newCount)
    triggerGenerate(selectedIndex, newCount)
  }

  function handleGenerate() {
    triggerGenerate(selectedIndex, count)
  }

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-6">{datasets[selectedIndex].name}</h1>

      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <label htmlFor="dataset-select" className="sr-only">
            Choose what to randomize
          </label>
          <select
            id="dataset-select"
            value={selectedIndex}
            onChange={handleDatasetChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {datasets.map((d, i) => (
              <option key={d.name} value={i}>
                {d.name}
              </option>
            ))}
          </select>

          <label htmlFor="count-select" className="sr-only">
            Number of results
          </label>
          <select
            id="count-select"
            value={count}
            onChange={handleCountChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {COUNT_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <ol className="space-y-4">
          {items.map((item, i) => (
            <li
              key={i}
              className="p-4 bg-gray-50 border border-gray-200 rounded text-gray-800 leading-snug"
            >
              {item}
            </li>
          ))}
        </ol>

        <button
          onClick={handleGenerate}
          disabled={cooling}
          className="px-6 py-2 bg-accent-primary text-white rounded font-medium transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate
        </button>
      </div>
    </div>
  )
}
