import { useRouter } from 'next/router'

export function Article({ i18n, children }) {
  const { locale } = useRouter()
  const currentI18n = locale

  if (currentI18n != i18n) {
    return null
  }
  return children
}
