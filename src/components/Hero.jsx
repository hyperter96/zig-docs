import { Fragment } from 'react'
import Image from 'next/legacy/image'
import clsx from 'clsx'
import { Highlight, themes, defaultProps } from 'prism-react-renderer'
import { ButtonLink } from '@/components/Button'
import { HeroBackground } from '@/components/HeroBackground'
import blurAmberImage from '@/images/blur-amber.png'
import blurIndigoImage from '@/images/blur-indigo.png'
import { useRouter } from 'next/router'

const codeLanguage = 'zig'
const code = `const std = @import("std");

pub fn main() void {
    std.debug.print("Hello, World Zig!\\n", .{});
}`

const tabs = [
  { name: 'main.zig', isActive: true },
  { name: 'build.zig', isActive: false },
]

export function Hero() {
  const { locale } = useRouter()

  const hero = require(`../../public/locales/${locale}/hero.json`)
  return (
    <div className="overflow-hidden bg-zinc-900 dark:-mb-32 dark:-mt-[4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:-mt-[4.75rem] dark:lg:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <div className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50">
              <Image
                src={blurAmberImage}
                alt=""
                layout="fixed"
                width={530}
                height={530}
                unoptimized
                priority
              />
            </div>
            <div className="relative">
              <p className="inline bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                {hero['title']}
              </p>
              <p className="mt-3 text-2xl tracking-tight text-slate-400">
                {hero['description']}
              </p>
              <div className="mt-8 flex space-x-4 md:justify-center lg:justify-start">
                <ButtonLink href="/">{hero['getStarted']}</ButtonLink>
                <ButtonLink
                  href="https://github.com/hyperter96/zig-docs"
                  variant="secondary"
                >
                  {hero['github']}
                </ButtonLink>
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="absolute inset-x-[-50vw] -bottom-48 -top-32 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
              <HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:-translate-y-[60%] lg:translate-x-0" />
            </div>
            <div className="relative">
              <div className="absolute -right-64 -top-64">
                <Image
                  src={blurAmberImage}
                  alt=""
                  layout="fixed"
                  width={530}
                  height={530}
                  unoptimized
                  priority
                />
              </div>
              <div className="absolute -bottom-40 -right-44">
                <Image
                  src={blurIndigoImage}
                  alt=""
                  layout="fixed"
                  width={567}
                  height={567}
                  unoptimized
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-amber-300 via-amber-300/70 to-amber-300 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-amber-300 via-amber-300/70 to-amber-300 opacity-10" />
              <div className="relative rounded-2xl bg-[#272822] ring-1 ring-white/10 backdrop-blur">
                <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-amber-300/0 via-amber-300/70 to-amber-300/0" />
                <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0" />
                <div className="pl-4 pt-4">
                  <svg
                    aria-hidden="true"
                    className="h-2.5 w-auto stroke-slate-500/30"
                    fill="none"
                  >
                    <circle cx="5" cy="5" r="4.5" />
                    <circle cx="21" cy="5" r="4.5" />
                    <circle cx="37" cy="5" r="4.5" />
                  </svg>
                  <div className="mt-4 flex space-x-2 text-xs">
                    {tabs.map((tab) => (
                      <div
                        key={tab.name}
                        className={clsx('flex h-6 rounded-full', {
                          'bg-gradient-to-r from-amber-400/30 via-amber-400 to-amber-400/30 p-px font-medium text-amber-300':
                            tab.isActive,
                          'text-slate-500': !tab.isActive,
                        })}
                      >
                        <div
                          className={clsx(
                            'flex items-center rounded-full px-2.5',
                            { 'bg-zinc-800': tab.isActive }
                          )}
                        >
                          {tab.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-start px-1 text-sm">
                    <div
                      aria-hidden="true"
                      className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                    >
                      {Array.from({
                        length: code.split('\n').length,
                      }).map((_, index) => (
                        <Fragment key={index}>
                          {(index + 1).toString()}
                          <br />
                        </Fragment>
                      ))}
                    </div>
                    <Highlight
                      {...defaultProps}
                      code={code}
                      language={codeLanguage}
                      theme={themes.okaidia}
                    >
                      {({
                        className,
                        style,
                        tokens,
                        getLineProps,
                        getTokenProps,
                      }) => (
                        <pre
                          className={clsx(
                            className,
                            'flex overflow-x-auto pb-6'
                          )}
                          style={style}
                        >
                          <code className="px-4">
                            {tokens.map((line, index) => (
                              <div key={index} {...getLineProps({ line })}>
                                {line.map((token, index) => (
                                  <span
                                    key={index}
                                    {...getTokenProps({ token })}
                                  />
                                ))}
                              </div>
                            ))}
                          </code>
                        </pre>
                      )}
                    </Highlight>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
