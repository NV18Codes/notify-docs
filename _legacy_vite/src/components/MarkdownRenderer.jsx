import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyCodeButton } from './CopyCodeButton'
import { useTheme } from '../context/ThemeContext'
import { cn } from '../lib/utils'

function textFromNodes(node) {
  if (node == null) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textFromNodes).join('')
  if (typeof node === 'object' && node.props && node.props.children != null) return textFromNodes(node.props.children)
  return ''
}

/** Blockquotes that start with IMPORTANT: / TIP: / RECOMMENDATION: (optional ** around label) become callouts. */
function parseCallout(flatText) {
  const t = flatText.replace(/\*\*/g, '').trim()
  const m = t.match(/^(IMPORTANT|TIP|RECOMMENDATION)\s*:\s*([\s\S]*)$/i)
  if (!m) return null
  const kind = m[1].toLowerCase()
  const body = (m[2] || '').trim()
  const variant = kind === 'important' ? 'warning' : kind === 'tip' ? 'tip' : 'rec'
  return { variant, body }
}

const CALLOUT_STYLES = {
  warning: 'border-l-amber-500 bg-amber-50/80 dark:border-l-amber-400 dark:bg-amber-950/25',
  tip: 'border-l-sky-500 bg-sky-50/70 dark:border-l-sky-400 dark:bg-sky-950/20',
  rec: 'border-l-emerald-500 bg-emerald-50/70 dark:border-l-emerald-400 dark:bg-emerald-950/20',
}

const CALLOUT_LABEL = {
  warning: 'Important',
  tip: 'Tip',
  rec: 'Recommendation',
}

function CalloutMarkdown({ body, linkComponent }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: linkComponent, p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0">{children}</p> }}>
      {body}
    </ReactMarkdown>
  )
}

function CalloutBlock({ variant, body, linkComponent }) {
  return (
    <aside
      className={cn(
        'not-prose my-8 rounded-r-lg border-l-[3px] py-3 pl-4 pr-3 text-[15px] leading-[1.75] text-slate-800 shadow-sm dark:text-slate-200',
        CALLOUT_STYLES[variant],
      )}
    >
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
        {variant === 'warning' ? '\u26a0\ufe0f ' : variant === 'tip' ? '\u{1F4A1} ' : '\u2705 '}
        {CALLOUT_LABEL[variant]}
      </p>
      <div className="text-[15px] leading-[1.75] text-slate-800 dark:text-slate-200 [&_a]:font-medium [&_a]:underline [&_a]:decoration-slate-400 [&_a]:underline-offset-2">
        <CalloutMarkdown body={body} linkComponent={linkComponent} />
      </div>
    </aside>
  )
}

export function MarkdownRenderer({ content }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const codeStyle = isDark ? oneDark : vs

  const linkComponent = ({ href, children, ...props }) => {
    if (href?.startsWith('/')) {
      return (
        <Link to={href} className="transition hover:opacity-80" {...props}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
        {children}
      </a>
    )
  }

  return (
    <article className="doc-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          hr() {
            return <hr className="not-prose my-14 border-0 border-t border-slate-200 dark:border-slate-800" />
          },
          blockquote({ children }) {
            const flat = textFromNodes(children)
            const parsed = parseCallout(flat)
            if (parsed) {
              if (parsed.body) {
                return <CalloutBlock variant={parsed.variant} body={parsed.body} linkComponent={linkComponent} />
              }
            }
            return (
              <blockquote className="not-prose my-8 border-l-2 border-slate-300 pl-4 text-[15px] leading-[1.75] text-slate-600 dark:border-slate-600 dark:text-slate-400">
                {children}
              </blockquote>
            )
          },
          img({ src, alt, title, node: _imgNode, ...props }) {
            return (
              <figure className="not-prose my-10 mx-auto max-w-3xl">
                <div className="overflow-hidden rounded-lg border border-slate-200/90 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
                  <img
                    src={src}
                    alt={alt ?? ''}
                    title={title}
                    className="w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    {...props}
                  />
                </div>
                {title ? (
                  <figcaption className="mt-3 text-center text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {title}
                  </figcaption>
                ) : null}
              </figure>
            )
          },
          a: linkComponent,
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const codeString = String(children).replace(/\n$/, '')
            if (!inline) {
              if (match) {
                return (
                  <div className="relative my-6 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <CopyCodeButton code={codeString} />
                    <SyntaxHighlighter
                      style={codeStyle}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: '1rem 1rem 1rem 1rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.8125rem',
                        lineHeight: 1.65,
                        background: 'transparent',
                      }}
                      {...props}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                )
              }
              return (
                <div className="relative my-6 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                  <CopyCodeButton code={codeString} />
                  <pre className="text-[0.8125rem] leading-relaxed text-slate-800 dark:text-slate-100">
                    <code>{codeString}</code>
                  </pre>
                </div>
              )
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
