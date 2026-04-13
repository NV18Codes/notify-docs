import { useEffect, useRef, useState } from 'react'
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils'

function pickReply(text, t) {
  const lower = text.toLowerCase()
  if (/price|pricing|rupee|rs\.?|inr|cost|bill|plan/.test(lower)) return t('chatbot.replies.pricing')
  if (/campaign|broadcast|send|template|message/.test(lower)) return t('chatbot.replies.campaign')
  if (/start|begin|onboard|setup|how do i/.test(lower)) return t('chatbot.replies.start')
  return t('chatbot.replies.default')
}

function formatReply(md) {
  const parts = md.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-medium text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

const OPEN_DELAY_MS = 5000

export function Chatbot({ className }) {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(() => [{ id: 'welcome', role: 'bot', text: t('chatbot.welcome') }])
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), OPEN_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [])

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
    }, 500)
  }

  if (!visible) return null

  return (
    <div className={cn('fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-2', className)}>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            className="flex w-[min(100vw-2.5rem,20rem)] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
            role="dialog"
            aria-label={t('chatbot.title')}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2.5 dark:border-slate-800">
              <div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">{t('chatbot.title')}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{t('chatbot.subtitle')}</div>
              </div>
              <button
                type="button"
                className="rounded-md p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setOpen(false)}
                aria-label={t('chatbot.close')}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-60 space-y-2 overflow-y-auto px-3 py-2.5">
              {messages.map((m) => (
                <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[92%] rounded-lg px-2.5 py-1.5 text-[13px] leading-relaxed',
                      m.role === 'user'
                        ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-100',
                    )}
                  >
                    {m.role === 'bot' ? formatReply(m.text) : m.text}
                  </div>
                </div>
              ))}
              {typing ? (
                <div className="text-[11px] text-slate-400">{t('chatbot.typing')}</div>
              ) : null}
              <div ref={bottomRef} />
            </div>

            <div className="flex flex-wrap gap-1.5 border-t border-slate-100 px-2.5 py-2 dark:border-slate-800">
              {[t('chatbot.suggestions.start'), t('chatbot.suggestions.campaign'), t('chatbot.suggestions.pricing')].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  onClick={() => pushUser(label)}
                >
                  {label}
                </button>
              ))}
            </div>

            <form
              className="flex items-center gap-2 border-t border-slate-100 p-2.5 dark:border-slate-800"
              onSubmit={(e) => {
                e.preventDefault()
                pushUser(input)
              }}
            >
              <input
                className="flex-1 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-[13px] text-slate-900 focus:border-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder={t('chatbot.placeholder')}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                aria-label={t('chatbot.send')}
              >
                <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-md dark:bg-white dark:text-slate-900"
        aria-expanded={open}
        aria-label={open ? t('chatbot.close') : t('chatbot.open')}
      >
        {open ? <XMarkIcon className="h-6 w-6" /> : <ChatBubbleLeftRightIcon className="h-6 w-6" />}
      </button>
    </div>
  )
}
