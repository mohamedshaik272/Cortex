import { useCallback, useId, useState } from 'react'
import { extractContractInsights } from '../../lib/contractInsights'
import { SAMPLE_CONTRACT_TEXT } from '../../data/homeownerLogDemo'

export default function ContractUploadSection({ insights, onParsed }) {
  const id = useId()
  const [status, setStatus] = useState(null)
  const [paste, setPaste] = useState('')

  const runExtract = useCallback(
    (text) => {
      if (!text.trim()) {
        setStatus('Add text or upload a .txt file to analyze.')
        return
      }
      const out = extractContractInsights(text)
      onParsed(out)
      setStatus(
        `Extracted ${out.warranties.length} warranty reference(s) \u00b7 ${out.expenseNotes.length} expense note(s).`,
      )
    },
    [onParsed],
  )

  const onFile = useCallback(
    (file) => {
      if (!file) return
      const name = file.name.toLowerCase()
      if (name.endsWith('.txt') || file.type === 'text/plain' || name.endsWith('.md')) {
        const reader = new FileReader()
        reader.onload = () => {
          const t = typeof reader.result === 'string' ? reader.result : ''
          runExtract(t)
        }
        reader.readAsText(file)
        return
      }
      if (name.endsWith('.pdf')) {
        setStatus(
          'PDFs are not parsed in-browser. Paste key sections below or upload a .txt export.',
        )
        return
      }
      setStatus('Unsupported type \u2014 try .txt or paste contract text.')
    },
    [runExtract],
  )

  return (
    <section className="rounded-2xl border border-orange-200/30 bg-paper/90 p-6 ring-1 ring-orange-100/40">
      <h2 className="font-display text-lg font-semibold text-ink">
        Documents & warranties
      </h2>
      <p className="mt-1 text-sm text-muted">
        Upload a contract or paste your closing documents. Cortex will extract warranty
        schedules, builder terms, and expense details automatically.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <label
          htmlFor={id}
          className="btn-primary inline-flex cursor-pointer items-center justify-center"
        >
          Upload document
        </label>
        <input
          id={id}
          type="file"
          accept=".txt,.md,text/plain,application/pdf"
          className="sr-only"
          onChange={(e) => onFile(e.target.files?.[0])}
        />
        <button
          type="button"
          onClick={() => runExtract(SAMPLE_CONTRACT_TEXT)}
          className="btn-secondary"
        >
          Load example contract
        </button>
      </div>

      <div className="mt-4">
        <label htmlFor={`${id}-paste`} className="text-xs font-semibold uppercase tracking-wide text-muted">
          Or paste contract text
        </label>
        <textarea
          id={`${id}-paste`}
          value={paste}
          onChange={(e) => setPaste(e.target.value)}
          rows={5}
          placeholder="Paste warranty pages, addenda, or closing disclosures here\u2026"
          className="mt-1 w-full rounded-xl border border-orange-200/30 bg-elevated/90 px-3 py-2 text-sm text-ink placeholder:text-muted ring-1 ring-orange-200/20 focus:border-accent/40 focus:outline-none focus:ring-2 focus:ring-accent/20"
        />
        <button
          type="button"
          onClick={() => runExtract(paste)}
          className="btn-ghost mt-2"
        >
          Analyze pasted text &rarr;
        </button>
      </div>

      {status ? <p className="mt-3 text-xs text-muted">{status}</p> : null}

      {insights ? (
        <div className="mt-6 space-y-4">
          {insights.rawSnippet ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Snippet processed</p>
              <p className="mt-1 rounded-lg bg-surface/80 p-3 font-mono text-xs leading-relaxed text-muted">
                {insights.rawSnippet}
              </p>
            </div>
          ) : null}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Warranties detected</p>
            <ul className="mt-2 space-y-3">
              {insights.warranties.map((w) => (
                <li
                  key={w.id}
                  className="rounded-xl border border-orange-200/30 bg-accent-soft/50 p-3 text-sm ring-1 ring-orange-200/40"
                >
                  <p className="font-semibold text-ink">{w.title}</p>
                  <p className="mt-1 text-xs text-muted">{w.summary}</p>
                  <p className="mt-1 text-xs text-ink">{w.coverage}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span
                      className={`rounded-full px-2 py-0.5 ring-1 ${
                        w.status === 'active'
                          ? 'bg-accent-soft text-terracotta ring-accent/30'
                          : w.status === 'expired'
                            ? 'bg-surface/80 text-muted ring-orange-200/30'
                            : 'bg-accent-soft text-rust ring-orange-200/40'
                      }`}
                    >
                      Status: {w.status}
                    </span>
                    {w.expiresOn ? (
                      <span className="rounded-full bg-surface/80 px-2 py-0.5 ring-1 ring-orange-200/30">
                        Date ref: {w.expiresOn}
                      </span>
                    ) : null}
                  </div>
                  {w.exclusions.length ? (
                    <p className="mt-2 text-xs text-muted">
                      Exclusions: {w.exclusions.join('; ')}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          {insights.expenseNotes.length ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Expense / closing cues</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted">
                {insights.expenseNotes.map((e, i) => (
                  <li key={i}>
                    <span className="font-medium text-ink">{e.label}</span>
                    {e.notes ? ` \u2014 ${e.notes}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {insights.hoaOrSpecialTerms.length ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">HOA / special terms</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted">
                {insights.hoaOrSpecialTerms.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
