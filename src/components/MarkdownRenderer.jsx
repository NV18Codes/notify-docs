import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from 'react-router-dom'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyCodeButton } from './CopyCodeButton'
import { useTheme } from '../context/ThemeContext'

export function MarkdownRenderer({ content }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const codeStyle = isDark ? oneDark : vs

  return (
    <article className="doc-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img({ src, alt, title, node: _imgNode, ...props }) {
            return (
              <figure className="not-prose my-8 mx-auto max-w-3xl">
                <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
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
          a({ href, children, className, node: _node, ...props }) {
            if (href?.startsWith('/')) {
              return (
                <Link to={href} className={className} {...props}>
                  {children}
                </Link>
              )
            }
            return (
              <a
                href={href}
                className={className}
                target="_blank"
                rel="noreferrer noopener"
                {...props}
              >
                {children}
              </a>
            )
          },
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const codeString = String(children).replace(/\n$/, '')
            if (!inline) {
              if (match) {
                return (
                  <div className="relative my-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                    <CopyCodeButton code={codeString} />
                    <SyntaxHighlighter
                      style={codeStyle}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        padding: '1rem 1rem 1rem 1rem',
                        borderRadius: '0.75rem',
                        fontSize: '0.8125rem',
                        lineHeight: 1.6,
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
                <div className="relative my-4 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                  <CopyCodeButton code={codeString} />
                  <pre className="text-sm text-slate-800 dark:text-slate-100">
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
