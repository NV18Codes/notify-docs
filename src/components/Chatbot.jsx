import { useEffect, useRef, useState } from 'react'
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils'

function pickReply(text, t) {
  const lower = text.toLowerCase()
  if (/price|pricing|₹|rupee|cost|bill/.test(lower)) return t('chatbot.replies.pricing')
  if (/start|begin|onboard|setup|how do i/.test(lower)) return t('chatbot.replies.start')
  if (/feature|capabilit|what can|include/.test(lower)) return t('chatbot.replies.features')
  return t('chatbot.replies.default')
}

function formatReply(md) {
  const parts = md.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export function Chatbot({ className }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(() => [
    { id: 'welcome', role: 'bot', text: t('chatbot.replies.default') },
  ])
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, open])

  function pushUser(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    const id = `u-${Date.now()}`
    setMessages((m) => [...m, { id, role: 'user', text: trimmed }])
    setInput('')
    setTyping(true)
    window.setTimeout(() => {
      const reply = pickReply(trimmed, t)
      setTyping(false)
      setMessages((m) => [...m, { id: `b-${Date.now()}`, role: 'bot', text: reply }])
    }, 700)
  }

  return (
    <div className={cn('fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3', className)}>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="flex w-[min(100vw-3rem,22rem)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            role="dialog"
            aria-label={t('chatbot.title')}
          >
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-3 dark:border-slate-800">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{t('chatbot.title')}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{t('chatbot.subtitle')}</div>
              </div>
              <button
                type="button"
                className="rounded-lg p-1.5 text-slate-500 hover:bg-white/60 dark:hover:bg-slate-800"
                onClick={() => setOpen(false)}
                aria-label={t('chatbot.close')}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    'flex',
                    m.role === 'user' ? 'justify-end' : 'justify-start',
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-relaxed',
                      m.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
                    )}
                  >
                    {m.role === 'bot' ? formatReply(m.text) : m.text}
                  </div>
                </div>
              ))}
              {typing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"
                >
                  <span className="inline-flex gap-1">
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.1 }}
                    />
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.1, delay: 0.15 }}
                    />
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.1, delay: 0.3 }}
                    />
                  </span>
                  {t('chatbot.typing')}
                </motion.div>
              ) : null}
              <div ref={bottomRef} />
            </div>

            <div className="flex flex-wrap gap-2 border-t border-slate-100 px-3 py-2 dark:border-slate-800">
              {[t('chatbot.suggestions.start'), t('chatbot.suggestions.pricing'), t('chatbot.suggestions.features')].map(
                (label) => (
                  <button
                    key={label}
                    type="button"
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 hover:border-primary/40 hover:bg-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    onClick={() => pushUser(label)}
                  >
                    {label}
                  </button>
                ),
              )}
            </div>

            <form
              className="flex items-center gap-2 border-t border-slate-100 p-3 dark:border-slate-800"
              onSubmit={(e) => {
                e.preventDefault()
                pushUser(input)
              }}
            >
              <input
                className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder={t('chatbot.placeholder')}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm hover:bg-primary/90"
                aria-label={t('chatbot.send')}
              >
                <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-white dark:ring-slate-900"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        aria-expanded={open}
        aria-label={open ? t('chatbot.close') : t('chatbot.open')}
      >
        {open ? <XMarkIcon className="h-7 w-7" /> : <ChatBubbleLeftRightIcon className="h-7 w-7" />}
      </motion.button>
    </div>
  )
}
