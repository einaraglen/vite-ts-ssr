import { create } from 'zustand'
import type { PageContextBuiltIn } from 'vite-plugin-ssr/types'
import type { PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient } from 'vite-plugin-ssr/types'
import { ReactNode, useEffect } from 'react'

export type PageContext = (PageContextBuiltIn | PageContextBuiltInClient) & { set: any, pageProps: any }

const initial: any = {}

export const usePageContext = create<PageContext>((set: any) => ({
  ...initial,
  set,
}))

interface Props {
  pageContext: PageContextBuiltIn | PageContextBuiltInClient
  children: ReactNode
}

const PageContextProvider = ({ pageContext, children }: Props) => {
  const { set } = usePageContext()

  useEffect(() => set({ ...pageContext }), [pageContext])
  return <>{children}</>
}

export default PageContextProvider
