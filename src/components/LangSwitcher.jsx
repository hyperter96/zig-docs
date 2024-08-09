import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Listbox } from '@headlessui/react'
import clsx from 'clsx'

const langs = [
  { name: '简体中文', value: 'zh-CN', icon: ZhCnIcon },
  { name: 'English', value: 'en', icon: EnIcon },
]

function IconBase({ children, ...props }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 512 420.165" {...props}>
      {children}
    </svg>
  )
}

function ZhCnIcon(props) {
  return (
    <IconBase {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M74.316 0h363.368c20.398 0 38.963 8.366 52.425 21.816h.075C503.634 35.266 512 53.862 512 74.316v271.533c0 20.398-8.366 38.963-21.816 52.426l-.075.074c-13.462 13.45-32.027 21.816-52.425 21.816H74.316c-20.454 0-39.05-8.366-52.5-21.816l-1.065-1.164C7.926 383.822 0 365.702 0 345.849V74.316c0-20.454 8.366-39.05 21.816-52.5C35.266 8.366 53.862 0 74.316 0zm171.611 283.285H119.668v-29.282l59.966-78.239-.704-1.401h-49.189l-4.217-37.483h119.467v29.282l-59.268 78.239.704 1.408h59.5v37.476zm99.553 0V231.52h-35.132v51.765h-46.851V136.88h46.851v51.772h35.132V136.88h46.852v146.405H345.48z"
      />
    </IconBase>
  )
}

function EnIcon(props) {
  return (
    <IconBase {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M74.32 0h363.36C478.55 0 512 33.46 512 74.32v271.53c0 40.82-33.5 74.32-74.32 74.32H74.32C33.44 420.17 0 386.69 0 345.85V74.32C0 33.41 33.41 0 74.32 0zm265.7 282.62c-4.24-6.15-38.45-62.67-38.76-62.67v62.67h-46.42V137.55h43.63c4.19 6.07 37.63 62.67 38.77 62.67v-62.67h46.41v145.07h-43.63zm-118.83-54.78h-46.42v17.64h56.86v37.14H128.35V137.55h102.12l-5.8 37.14h-49.9v19.49h46.42v33.66z"
      />
    </IconBase>
  )
}

export function LangSwitcher(props) {
  const { pathname, query, asPath, locale } = useRouter()
  let [selectedLang, setSelectedLang] = useState(
    langs.filter(function (lang) {
      return lang.value === locale
    })[0]
  )
  useEffect(() => {
    if (selectedLang) {
      document.documentElement.setAttribute('lang', selectedLang.value)
    } else {
      setSelectedLang(
        langs.find(
          (lang) => lang.value === document.documentElement.getAttribute('lang')
        )
      )
    }
  }, [selectedLang])

  return (
    <Listbox
      as="div"
      value={selectedLang}
      onChange={setSelectedLang}
      {...props}
    >
      <Listbox.Label className="sr-only">Lang</Listbox.Label>
      <Listbox.Button className="flex h-6 w-6 items-center justify-center rounded-lg shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-zinc-700 dark:ring-inset dark:ring-white/5">
        <span className="sr-only">{selectedLang?.name}</span>
        <ZhCnIcon className="hidden h-4 w-4 fill-amber-400 [[lang=zh-CN]_&]:block" />
        <EnIcon className="hidden h-4 w-4 fill-amber-400 [[lang=en]_&]:block" />
      </Listbox.Button>
      <Listbox.Options className="absolute left-1/2 top-full mt-3 w-36 -translate-x-1/2 space-y-1 rounded-xl bg-white p-3 text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-zinc-800 dark:ring-white/5">
        {langs.map((lang) => (
          <Link
            key={lang.value}
            href={{ pathname, query }}
            as={asPath}
            locale={lang.value}
          >
            <Listbox.Option
              key={lang.value}
              value={lang}
              className={({ active, selected }) =>
                clsx(
                  'flex cursor-pointer select-none items-center rounded-[0.625rem] p-1',
                  {
                    'text-amber-500': selected,
                    'text-slate-900 dark:text-white': active && !selected,
                    'text-slate-700 dark:text-slate-400': !active && !selected,
                    'bg-zinc-100 dark:bg-zinc-900/40': active,
                  }
                )
              }
            >
              {({ selected }) => (
                <>
                  <div className="rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-zinc-700 dark:ring-inset dark:ring-white/5">
                    <lang.icon
                      className={clsx('h-5 w-5', {
                        'fill-amber-400 dark:fill-amber-400': selected,
                        'fill-slate-400': !selected,
                      })}
                    />
                  </div>
                  <div className="ml-3">{lang.name}</div>
                </>
              )}
            </Listbox.Option>
          </Link>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
