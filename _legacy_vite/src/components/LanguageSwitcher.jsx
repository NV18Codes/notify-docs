import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, LanguageIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

const LANGS = [
  { id: 'en', labelKey: 'lang.en' },
  { id: 'hi', labelKey: 'lang.hi' },
  { id: 'kn', labelKey: 'lang.kn' },
]

export function LanguageSwitcher({ className }) {
  const { i18n, t } = useTranslation()
  const lng = i18n.language?.split('-')[0] || 'en'
  const current = LANGS.find((l) => l.id === lng) || LANGS[0]

  return (
    <div className={cn('relative', className)}>
      <Listbox
        value={lng}
        onChange={(id) => {
          void i18n.changeLanguage(id)
        }}
      >
        <div className="relative">
          <ListboxButton className="relative inline-flex h-9 min-w-[7.5rem] cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white py-1.5 pl-2.5 pr-7 text-left text-sm text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/30 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
            <LanguageIcon className="h-4 w-4 text-slate-500 dark:text-slate-400" aria-hidden />
            <span className="block truncate font-medium">{t(current.labelKey)}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-4 w-4 text-slate-400" aria-hidden />
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none dark:border-slate-700 dark:bg-slate-900">
              {LANGS.map((lang) => (
                <ListboxOption
                  key={lang.id}
                  className={({ active }) =>
                    cn(
                      'relative cursor-pointer select-none py-2 pl-9 pr-3',
                      active ? 'bg-slate-50 dark:bg-slate-800' : '',
                    )
                  }
                  value={lang.id}
                >
                  {({ selected }) => (
                    <>
                      <span className={cn('block truncate', selected ? 'font-semibold' : 'font-normal')}>
                        {t(lang.labelKey)}
                      </span>
                      {selected ? (
                        <motion.span
                          layout
                          className="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-900 dark:text-white"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                        >
                          <CheckIcon className="h-4 w-4" aria-hidden />
                        </motion.span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
