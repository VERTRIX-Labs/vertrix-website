import { useEffect } from 'react'

const BASE = 'VERTRIX'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : `${BASE} — Code. Build. Innovate.`
  }, [title])
}
