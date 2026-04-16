import { useState } from 'react'
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'

export function CopyCodeButton({ code, className }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'absolute right-2 top-2 inline-flex items-center gap-1 rounded-md border border-slate-200/80 bg-white/90 px-2 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur hover:bg-white dark:border-slate-600 dark:bg-slate-900/90 dark:text-slate-200',
        className,
      )}
      aria-label={copied ? 'Copied' : 'Copy code'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="check"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-200"
          >
            <CheckIcon className="h-3.5 w-3.5" />
            Copied
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="inline-flex items-center gap-1"
          >
            <ClipboardDocumentIcon className="h-3.5 w-3.5" />
            Copy
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
