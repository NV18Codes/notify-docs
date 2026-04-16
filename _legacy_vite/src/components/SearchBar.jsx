import { useEffect, useMemo, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useDocSearch } from '../hooks/useDocSearch'
import { cn } from '../lib/utils'

function highlightText(text, indices = []) {
  if (!indices.length) return text
  const sorted = [...indices].sort((a, b) => a[0] - b[0])
  const out = []
  let last = 0
  sorted.forEach(([start, end], i) => {
    if (start > last) out.push(text.slice(last, start))
    out.push(
      <mark key={`${start}-${end}-${i}`} className="rounded bg-amber-100 px-0.5 text-inherit dark:bg-amber-900/40">
        {text.slice(start, end + 1)}
      </mark>,
    )
    last = end + 1
  })
  if (last < text.length) out.push(text.slice(last))
  return out
}

export function SearchBar({ className }) {
  const { t } = useTranslation()
  const { search } = useDocSearch()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const inputRef = useRef(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    return search(query)
  }, [query, search])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onDoc = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div ref={wrapRef} className={cn('relative w-full max-w-md', className)}>
      <MagnifyingGlassIcon
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden
      />
      <input
        ref={inputRef}
        className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-20 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
        placeholder={t('search.placeholder')}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        autoComplete="off"
        aria-label={t('nav.search')}
        aria-expanded={open}
        role="combobox"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-slate-600 dark:bg-slate-800 sm:inline">
        ⌘K
      </span>

      <AnimatePresence>
        {open && query.trim() ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[80] mt-1.5 max-h-72 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-950"
            role="listbox"
          >
            {results.length === 0 ? (
              <div className="px-3 py-6 text-center text-slate-500 dark:text-slate-400">{t('search.empty')}</div>
            ) : (
              results.map(({ item, matches }) => {
                const titleMatch = matches?.find((m) => m.key === 'title')
                const excerptMatch = matches?.find((m) => m.key === 'excerpt')
                const titleIndices = titleMatch?.indices || []
                const excerptIndices = excerptMatch?.indices || []
                return (
                  <button
                    key={item.slug}
                    type="button"
                    role="option"
                    className="flex w-full flex-col gap-0.5 px-3 py-2.5 text-left hover:bg-slate-50 focus:bg-slate-50 focus:outline-none dark:hover:bg-slate-800 dark:focus:bg-slate-800"
                    onClick={() => {
                      navigate(`/docs/${item.slug}`)
                      setQuery('')
                      setOpen(false)
                    }}
                  >
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {highlightText(item.title, titleIndices)}
                    </div>
                    {item.excerpt ? (
                      <div className="line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                        {highlightText(item.excerpt, excerptIndices)}
                      </div>
                    ) : null}
                  </button>
                )
              })
            )}
            <div className="border-t border-slate-100 px-3 py-2 text-[11px] text-slate-400 dark:border-slate-800">
              {t('search.hint')}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
