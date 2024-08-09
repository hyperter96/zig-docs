import clsx from 'clsx'

import { CustomIcon, Icon } from '@/components/Icon'

const styles = {
  note: {
    container:
      'bg-emerald-50 dark:bg-zinc-700/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-amber-900 dark:text-amber-400',
    body: 'text-amber-800 prose-code:text-amber-900 dark:prose-strong:text-slate-300 dark:text-slate-300 dark:prose-code:text-slate-300 prose-a:text-amber-900 [--tw-prose-background:theme(colors.amber.50)] prose-inline-code:text-red-700 dark:prose-inline-code:text-amber-100',
  },
  warning: {
    container:
      'bg-amber-50 dark:bg-zinc-700/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-amber-900 dark:text-amber-500',
    body: 'text-amber-800 prose-code:text-amber-900 dark:prose-strong:text-slate-300 prose-a:text-amber-900 [--tw-prose-underline:theme(colors.amber.400)] dark:[--tw-prose-underline:theme(colors.amber.700)] [--tw-prose-background:theme(colors.amber.50)] dark:text-slate-300 dark:prose-code:text-slate-300 prose-inline-code:text-red-700 dark:prose-inline-code:text-amber-100',
  },
  question: {
    container:
      'bg-violet-50 dark:bg-zinc-700/60 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-amber-900 dark:text-amber-400',
    body: 'text-amber-800 prose-code:text-amber-900 dark:prose-strong:text-slate-300 dark:text-slate-300 dark:prose-code:text-slate-300 prose-a:text-amber-900 [--tw-prose-background:theme(colors.amber.50)] prose-inline-code:text-red-700 dark:prose-inline-code:text-amber-100',
  },
  book: {
    container:
      'bg-orange-50 dark:bg-orange-200/20 dark:ring-1 dark:ring-slate-300/10',
    title: 'text-amber-900 dark:text-amber-400',
    body: 'text-amber-800 prose-code:text-amber-900 dark:prose-strong:text-slate-300 dark:text-slate-300 dark:prose-code:text-slate-300 prose-a:text-amber-900 [--tw-prose-background:theme(colors.amber.50)] prose-inline-code:text-red-700 dark:prose-inline-code:text-amber-100',
  },
}

const icons = {
  note: (props) => <Icon icon="lightbulb" {...props} />,
  question: (props) => (
    <CustomIcon icon="question" viewBox={27.116} {...props} />
  ),
  book: (props) => <CustomIcon icon="book" viewBox={24} {...props} />,
  warning: (props) => <Icon icon="warning" color="amber" {...props} />,
}

export function Callout({ type = 'note', title, children }) {
  let IconComponent = icons[type]

  return (
    <div
      className={clsx('my-4 flex-auto rounded-xl p-5', styles[type].container)}
    >
      <div className="flex">
        <IconComponent className="h-8 w-8 flex-none" />
        <div className="ml-2 flex-auto">
          <p className={clsx('m-0 font-display text-base', styles[type].title)}>
            {title}
          </p>
        </div>
      </div>
      <div className={clsx('prose mx-4 mt-2.5 text-sm', styles[type].body)}>
        {children}
      </div>
    </div>
  )
}
